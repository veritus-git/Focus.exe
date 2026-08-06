use std::process;
use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};

/// Dev Backdoor command to instantly terminate the kiosk process from Rust backend
#[tauri::command]
fn exit_app() {
    println!("[DEV BACKDOOR] Terminating Focus.exe process...");
    process::exit(0);
}

/// Spawns pitch-black overlay windows on every non-primary monitor
/// to prevent the user from seeing or interacting with anything else.
fn spawn_monitor_overlays(app: &tauri::AppHandle) {
    let monitors = match app.available_monitors() {
        Ok(m) => m,
        Err(e) => {
            eprintln!("[FOCUS OS] Failed to enumerate monitors: {}", e);
            return;
        }
    };

    let primary = app.primary_monitor().ok().flatten();
    let primary_pos = primary.as_ref().map(|m| *m.position());

    for (idx, monitor) in monitors.iter().enumerate() {
        let mon_pos = monitor.position();
        let mon_size = monitor.size();

        // Skip primary monitor — the main window already covers it
        if let Some(ref pp) = primary_pos {
            if pp.x == mon_pos.x && pp.y == mon_pos.y {
                println!(
                    "[FOCUS OS] Skipping primary monitor #{} at ({}, {})",
                    idx, mon_pos.x, mon_pos.y
                );
                continue;
            }
        }

        let label = format!("overlay_{}", idx);
        println!(
            "[FOCUS OS] Spawning black overlay '{}' on monitor #{} at ({}, {}) size {}x{}",
            label, idx, mon_pos.x, mon_pos.y, mon_size.width, mon_size.height
        );

        match WebviewWindowBuilder::new(
            app,
            &label,
            WebviewUrl::App("overlay.html".into()),
        )
        .title("Focus.exe — Locked")
        .decorations(false)
        .resizable(false)
        .skip_taskbar(true)
        .always_on_top(true)
        .fullscreen(true)
        .focused(false)
        .position(mon_pos.x as f64, mon_pos.y as f64)
        .inner_size(mon_size.width as f64, mon_size.height as f64)
        .build()
        {
            Ok(_) => println!("[FOCUS OS] Overlay '{}' spawned successfully", label),
            Err(e) => eprintln!("[FOCUS OS] Failed to spawn overlay '{}': {}", label, e),
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_prevent_default::Builder::new()
                .with_flags(tauri_plugin_prevent_default::Flags::all())
                .build(),
        )
        .setup(|app| {
            let handle = app.handle().clone();

            if let Some(window) = app.get_webview_window("main") {
                // Target primary monitor explicitly
                if let Ok(Some(monitor)) = window.primary_monitor() {
                    let position = monitor.position();
                    let size = monitor.size();

                    // Position window on primary monitor & set fullscreen
                    let _ = window.set_position(*position);
                    let _ = window.set_size(*size);
                    let _ = window.set_fullscreen(true);
                    let _ = window.set_always_on_top(true);
                    let _ = window.set_focus();

                    // Trap cursor inside the main window
                    let _ = window.set_cursor_grab(true);

                    println!(
                        "[FOCUS OS] Main window placed on Primary Monitor at {:?}, size {:?}",
                        position, size
                    );
                } else {
                    let _ = window.set_fullscreen(true);
                    let _ = window.set_always_on_top(true);
                    let _ = window.set_cursor_grab(true);
                }

                // Refocus the main window when it loses focus (anti-alt-tab)
                let window_clone = window.clone();
                window.on_window_event(move |event| {
                    if let tauri::WindowEvent::Focused(false) = event {
                        println!("[FOCUS OS] Window lost focus — reclaiming...");
                        let _ = window_clone.set_focus();
                        let _ = window_clone.set_always_on_top(true);
                    }
                });
            }

            // Spawn black overlays on all non-primary monitors
            spawn_monitor_overlays(&handle);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![exit_app])
        .run(tauri::generate_context!())
        .expect("error while running Focus.exe tauri application");
}
