import sys
import ctypes
import time

try:
    window_id = int(sys.argv[1])
    x11 = ctypes.cdll.LoadLibrary('libX11.so.6')
    d = x11.XOpenDisplay(None)

    # XGrabPointer(display, grab_window, owner_events, event_mask, pointer_mode, keyboard_mode, confine_to, cursor, time)
    # owner_events=True (1) allows normal event delivery within the window
    res = x11.XGrabPointer(d, window_id, 1, 0, 1, 1, window_id, 0, 0)
    x11.XFlush(d)
    
    if res == 0: # GrabSuccess
        while True:
            time.sleep(3600)
except Exception:
    pass
