import sys, ctypes, time
x11 = ctypes.cdll.LoadLibrary('libX11.so.6')
xfixes = ctypes.cdll.LoadLibrary('libXfixes.so.3')
d = x11.XOpenDisplay(None)
root = x11.XDefaultRootWindow(d)
min_x, min_y, max_x, max_y = 0, 0, 1920, 1080
# XFixesCreatePointerBarrier expects: dpy, w, x1, y1, x2, y2, directions, num_devices, devices
xfixes.XFixesCreatePointerBarrier(d, root, min_x, min_y, max_x, min_y, 0, 0, None)
xfixes.XFixesCreatePointerBarrier(d, root, min_x, max_y, max_x, max_y, 0, 0, None)
xfixes.XFixesCreatePointerBarrier(d, root, min_x, min_y, min_x, max_y, 0, 0, None)
xfixes.XFixesCreatePointerBarrier(d, root, max_x, min_y, max_x, max_y, 0, 0, None)
x11.XFlush(d)
print("Barriers created.")
time.sleep(2)
