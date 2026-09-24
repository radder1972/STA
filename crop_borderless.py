import os
from PIL import Image

def process_borderless():
    img_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790268913660.png'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    original_rgb = Image.open(img_path).convert('RGB')
    width, height = original_rgb.size
    print(f"Image size: {width}x{height}")
    
    # Mathematical grid since there are no borders
    # Let's find the first non-white row from the top
    # The header says "SCHEMATHERAPIE..."
    # Then there's a gap, then the drawings start.
    
    # Just mathematically divide it, assuming standard layout:
    # 1024x559 total size
    # Header is ~80px.
    # Grid width is ~1000px, 6 columns -> ~166px per cell
    # Grid height is ~470px, 3 rows -> ~156px per cell
    margin_top = 80
    box_w = width / 6.0
    box_h = (height - margin_top) / 3.0
    
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Defectiveness_unlovability", "Social isolation_Alienation", "Practical incompetence_Dependence",
        "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Subjugation", "Self-sacrifice", "Admiration_Recognition-seeking",
        "Pessimism_Worry", "Emotional inhibition", "Unrelenting Standards", "Self-punitiveness", "Entitlement_Superiority", "Insufficient self-control_self-discipline"
    ]
    
    os.makedirs(output_dir, exist_ok=True)
    idx = 0
    
    for row in range(3):
        for col in range(6):
            if idx >= len(names): break
            
            # Slice cell
            l = int(col * box_w)
            r = int((col+1) * box_w)
            t = int(margin_top + row * box_h)
            b = int(margin_top + (row+1) * box_h)
            
            cell = original_rgb.crop((l, t, r, b))
            cell_w, cell_h = cell.size
            
            # Remove bottom 22% which contains the text
            drawing_cell = cell.crop((0, 0, cell_w, int(cell_h * 0.78)))
            
            # Shrinkwrap finding dark pixels
            cell_gray = drawing_cell.convert('L')
            min_x, min_y, max_x, max_y = drawing_cell.size[0], drawing_cell.size[1], 0, 0
            has_dark = False
            
            for y in range(drawing_cell.size[1]):
                for x in range(drawing_cell.size[0]):
                    if cell_gray.getpixel((x, y)) < 230: # Anything not white
                        min_x = min(min_x, x)
                        min_y = min(min_y, y)
                        max_x = max(max_x, x)
                        max_y = max(max_y, y)
                        has_dark = True
            
            if has_dark:
                pad = 4
                final_box = (
                    max(0, min_x-pad),
                    max(0, min_y-pad),
                    min(drawing_cell.size[0], max_x+pad),
                    min(drawing_cell.size[1], max_y+pad)
                )
                final_img = drawing_cell.crop(final_box)
            else:
                final_img = drawing_cell
                
            # Make the background pure white
            final_data = final_img.getdata()
            clean_data = []
            for item in final_data:
                # If pixel is light gray/white, make it pure white
                if item[0] > 220 and item[1] > 220 and item[2] > 220:
                    clean_data.append((255, 255, 255))
                else:
                    clean_data.append(item)
            final_img.putdata(clean_data)
            
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            final_img.save(filename, "PNG")
            print(f"Saved {filename} with size {final_img.size}")
            
            idx += 1

process_borderless()
