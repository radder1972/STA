import sys
from PIL import Image

def tint_image(input_path, output_path, target_color_hex):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    target_r = int(target_color_hex[1:3], 16)
    target_g = int(target_color_hex[3:5], 16)
    target_b = int(target_color_hex[5:7], 16)
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # If pixel is greyish (not too dark, not too light, and R~G~B)
        if a > 0 and r > 100 and r < 240 and abs(r - g) < 20 and abs(g - b) < 20:
            # Replace with target color, maybe blending based on original luminance
            luminance = r / 255.0
            new_r = int(target_r * luminance)
            new_g = int(target_g * luminance)
            new_b = int(target_b * luminance)
            new_data.append((new_r, new_g, new_b, a))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path)
    print(f"Saved {output_path}")

tint_image('src/assets/images/basisbehoeften/1.png', 'test_1.png', '#14b8a6')
