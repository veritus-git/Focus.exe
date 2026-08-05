use std::process;
use tauri::Manager;

/// Dev Backdoor command to instantly terminate the kiosk process from Rust backend
#[tauri::command]
fn exit_app() {
    println!("[DEV BACKDOOR] Terminating Focus.exe process...");
    process::exit(0);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if let Some(window) = app.get_webview_window("main") {
                // Target primary monitor explicitly
                if let Ok(Some(monitor)) = window.primary_monitor() {
                    let position = monitor.position();
                    let size = monitor.size();
                    
                    // Position window on primary monitor & set fullscreen
                    let _ = window.set_position(*position);
                    let _ = window.set_size(*size);
                    let _ = window.set_fullscreen(true);
                    let _ = window.set_focus();
                    println!("[FOCUS OS] Multi-monitor detection: Window placed on Primary Monitor at {:?}", position);
                } else {
                    let _ = window.set_fullscreen(true);
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![exit_app])
        .run(tauri::generate_context!())
        .expect("error while running Focus.exe tauri application");
}
