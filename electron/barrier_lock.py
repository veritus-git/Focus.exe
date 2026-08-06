import sys
import ctypes
import time

try:
    x11 = ctypes.cdll.LoadLibrary('libX11.so.6')
    xfixes = ctypes.cdll.LoadLibrary('libXfixes.so.3')
    
    d = x11.XOpenDisplay(None)
    root = x11.XDefaultRootWindow(d)
    
    min_x = int(sys.argv[1])
    min_y = int(sys.argv[2])
    max_x = int(sys.argv[3])
    max_y = int(sys.argv[4])
    
    # XFixesCreatePointerBarrier(display, window, x1, y1, x2, y2, directions, num_devices, devices)
    # directions=0 blocks crossing in all directions
    xfixes.XFixesCreatePointerBarrier(d, root, min_x, min_y, max_x, min_y, 0, 0, None) # Top
    xfixes.XFixesCreatePointerBarrier(d, root, min_x, max_y, max_x, max_y, 0, 0, None) # Bottom
    xfixes.XFixesCreatePointerBarrier(d, root, min_x, min_y, min_x, max_y, 0, 0, None) # Left
    xfixes.XFixesCreatePointerBarrier(d, root, max_x, min_y, max_x, max_y, 0, 0, None) # Right
    
    x11.XFlush(d)
    
    # Keep alive so X11 doesn't destroy the barriers on exit
    while True:
        time.sleep(3600)
except Exception:
    pass
