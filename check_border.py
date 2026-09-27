import struct

def check_png(filename):
    with open(filename, 'rb') as f:
        data = f.read(24)
        if data[:8] == b'\x89PNG\r\n\x1a\n':
            w, h = struct.unpack('>LL', data[16:24])
            print(f"{filename}: {w}x{h}")
            
check_png('src/assets/images/schemas/Abandonment.png')
