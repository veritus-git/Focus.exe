import sys
import time
import ctypes

if len(sys.argv) < 5:
    sys.exit(1)

min_x = int(sys.argv[1])
min_y = int(sys.argv[2])
max_x = int(sys.argv[3])
max_y = int(sys.argv[4])

try:
    x11 = ctypes.cdll.LoadLibrary('libX11.so.6')
    d = x11.XOpenDisplay(None)
    if not d:
        sys.exit(1)

    root = x11.XDefaultRootWindow(d)
    rx, ry, wx, wy, m = ctypes.c_int(), ctypes.c_int(), ctypes.c_int(), ctypes.c_int(), ctypes.c_uint()
    r_ret, c_ret = ctypes.c_ulong(), ctypes.c_ulong()

    while True:
        try:
            x11.XQueryPointer(d, root, ctypes.byref(r_ret), ctypes.byref(c_ret), 
                              ctypes.byref(rx), ctypes.byref(ry), 
                              ctypes.byref(wx), ctypes.byref(wy), ctypes.byref(m))
            cur_x = rx.value
            cur_y = ry.value
            needs_warp = False
            target_x = cur_x
            target_y = cur_y
            
            if cur_x < min_x:
                target_x = min_x
                needs_warp = True
            elif cur_x > max_x:
                target_x = max_x
                needs_warp = True
                
            if cur_y < min_y:
                target_y = min_y
                needs_warp = True
            elif cur_y > max_y:
                target_y = max_y
                needs_warp = True
                
            if needs_warp:
                x11.XWarpPointer(d, 0, root, 0, 0, 0, 0, target_x, target_y)
                x11.XFlush(d)
                
            time.sleep(0.015) # ~60 FPS
        except Exception:
            time.sleep(0.1)
except Exception:
    sys.exit(1)
