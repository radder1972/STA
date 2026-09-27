from PIL import Image

def find_lines(filename):
    img = Image.open(filename).convert('RGB')
    w, h = img.size
    
    # check horizontal lines
    for y in range(h):
        line_length = 0
        for x in range(w):
            r, g, b = img.getpixel((x, y))
            # check if pixel is grayish but not white
            if abs(r-g)<10 and abs(g-b)<10 and r < 250 and r > 100:
                line_length += 1
            else:
                if line_length > 50:
                    print(f"{filename} horizontal line at y={y}, x={x-line_length} to {x}")
                line_length = 0
                
    # check vertical lines
    for x in range(w):
        line_length = 0
        for y in range(h):
            r, g, b = img.getpixel((x, y))
            if abs(r-g)<10 and abs(g-b)<10 and r < 250 and r > 100:
                line_length += 1
            else:
                if line_length > 50:
                    print(f"{filename} vertical line at x={x}, y={y-line_length} to {y}")
                line_length = 0

find_lines('src/assets/images/basisbehoeften/1.png')
