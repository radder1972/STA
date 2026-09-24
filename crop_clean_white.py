import os
from PIL import Image

def process_clean_white():
    # Use the PREVIOUS clean image, not the fake-checkerboard one!
    img_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790267458147.png'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    original_rgb = Image.open(img_path).convert('RGB')
    
    # We already know the exact grid lines from crop_advanced.py
    h_lines = [19, 44, 64, 202, 232, 345, 382, 506]
    v_lines = [30, 191, 342, 518, 681, 792, 832, 994]
    
    # We need the 4 h_lines and 7 v_lines that actually bound the boxes.
    # Looking at the output from before, the correct ones are:
    # h_lines for borders: 64, 232, 382, 506 (Wait, 64 to 232 is 168. 232 to 345 is 113? No, row heights are ~168.
    # So h_lines: 64, 232, 382, 506? (Wait, 232 to 382 is 150. 382 to 506 is 124. This doesn't seem equal!)
    # Let's dynamically detect them again but be careful.
    
    img_gray = original_rgb.convert('L')
    width, height = original_rgb.size
    pixels = img_gray.load()
    
    row_sums = [sum(1 for x in range(width) if pixels[x, y] < 128) for y in range(height)]
    col_sums = [sum(1 for y in range(height) if pixels[x, y] < 128) for x in range(width)]
    
    def find_peaks(sums, threshold_ratio, min_distance):
        threshold = max(sums) * threshold_ratio
        peaks = []
        for i, v in enumerate(sums):
            if v > threshold:
                if not peaks or i - peaks[-1] >= min_distance:
                    peaks.append(i)
                elif sums[i] > sums[peaks[-1]]:
                    peaks[-1] = i
        return peaks

    # The actual borders will have huge peaks.
    h_peaks = find_peaks(row_sums, 0.4, 20)
    v_peaks = find_peaks(col_sums, 0.4, 20)
    
    # The actual borders in h_peaks and v_peaks:
    # Filter out text lines by knowing the approximate box size (~160x160)
    # Actually, we can just use the known margins.
    # The image is 1024x559.
    margin_top = 64
    box_w = (1024 - 30 - 30) / 6.0
    box_h = 168.0
    
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
            
            # Use fixed grid, then shrinkwrap
            l = int(30 + col * box_w)
            r = int(30 + (col+1) * box_w)
            
            t = int(margin_top + row * box_h)
            b = int(margin_top + (row+1) * box_h)
            
            # The border might be slightly off. Let's crop slightly inside.
            # And crop text at bottom (40px)
            cell = original_rgb.crop((l+8, t+8, r-8, b-44))
            
            # To shrinkwrap, find bounding box of dark pixels
            cell_gray = cell.convert('L')
            cell_w, cell_h = cell.size
            
            min_x, min_y, max_x, max_y = cell_w, cell_h, 0, 0
            has_dark = False
            
            for y in range(cell_h):
                for x in range(cell_w):
                    if cell_gray.getpixel((x, y)) < 200:
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
                
            # Create a clean white square background 
            # Make sure all near-white pixels become pure white
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

process_clean_white()
