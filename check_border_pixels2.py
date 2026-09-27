from PIL import Image

def find_border(filename):
    img = Image.open(filename).convert('RGB')
    w, h = img.size
    
    min_x, min_y, max_x, max_y = w, h, 0, 0
    for x in range(w):
        for y in range(h):
            if img.getpixel((x, y)) != (255, 255, 255):
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    print(f"{filename} bounding box: ({min_x}, {min_y}) to ({max_x}, {max_y}), size: {w}x{h}")

find_border('src/assets/images/basisbehoeften/1.png')
