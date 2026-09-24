import os
from PIL import Image

def process_perfect():
    img_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790269074523.png'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    img = Image.open(img_path).convert('RGB')
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    box_w = width / 6.0
    box_h = height / 3.0
    
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
            t = int(row * box_h)
            b = int((row+1) * box_h)
            
            cell = img.crop((l, t, r, b))
            
            # Shrinkwrap finding dark pixels
            cell_gray = cell.convert('L')
            cell_w, cell_h = cell.size
            min_x, min_y, max_x, max_y = cell_w, cell_h, 0, 0
            has_dark = False
            
            for y in range(cell_h):
                for x in range(cell_w):
                    if cell_gray.getpixel((x, y)) < 240: # Anything not pure white
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
                    min(cell_w, max_x+pad),
                    min(cell_h, max_y+pad)
                )
                final_img = cell.crop(final_box)
            else:
                final_img = cell
                
            # Make sure background is solid white (clean out any slight off-white JPG artifacts)
            final_data = final_img.getdata()
            clean_data = []
            for item in final_data:
                if item[0] > 220 and item[1] > 220 and item[2] > 220:
                    clean_data.append((255, 255, 255))
                else:
                    clean_data.append(item)
            final_img.putdata(clean_data)
            
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            final_img.save(filename, "PNG")
            print(f"Saved {filename} with size {final_img.size}")
            
            idx += 1

process_perfect()
