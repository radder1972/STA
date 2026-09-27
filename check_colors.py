from PIL import Image
def check_colors(filename):
    img = Image.open(filename).convert('RGB')
    for x in range(img.width):
        for y in range(img.height):
            r, g, b = img.getpixel((x, y))
            if abs(r-g) > 10 or abs(g-b) > 10:
                print(f"Colored pixel found: {r}, {g}, {b}")
                return
    print("Image is entirely grayscale.")

check_colors('src/assets/images/basisbehoeften/1.png')
