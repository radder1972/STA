import os
import sys
from PIL import Image, ImageFilter

def process_images():
    img_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790267458147.png'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    img = Image.open(img_path).convert('L')
    width, height = img.size
    pixels = img.load()
    
    # Profile horizontal and vertical dark pixels to find grid lines
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

    # The grid has horizontal and vertical borders
    # Horizontal lines span the whole width, so they will have very high row_sums
    h_lines = find_peaks(row_sums, 0.4, 20)
    # Vertical lines span the whole height, so they will have very high col_sums
    v_lines = find_peaks(col_sums, 0.4, 20)
    
    print(f"Detected H-lines: {h_lines}")
    print(f"Detected V-lines: {v_lines}")
    
    # We expect 4 h_lines and 7 v_lines for a 3x6 grid
    # If detection fails, we'll use fallback, but let's see.
    if len(h_lines) != 4:
        # Hardcode based on 1024x559 image
        h_lines = [84, 237, 390, 544] # Approximate
    if len(v_lines) != 7:
        v_lines = [28, 189, 350, 510, 672, 833, 994] # Approximate
        
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Defectiveness_unlovability", "Social isolation_Alienation", "Practical incompetence_Dependence",
        "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Subjugation", "Self-sacrifice", "Admiration_Recognition-seeking",
        "Pessimism_Worry", "Emotional inhibition", "Unrelenting Standards", "Self-punitiveness", "Entitlement_Superiority", "Insufficient self-control_self-discipline"
    ]
    
    original_rgb = Image.open(img_path).convert('RGB')
    
    os.makedirs(output_dir, exist_ok=True)
    idx = 0
    
    for row in range(3):
        for col in range(6):
            if idx >= len(names): break
            
            t = h_lines[row]
            b = h_lines[row+1]
            l = v_lines[col]
            r = v_lines[col+1]
            
            # Crop aggressively inside the border lines
            crop_t = t + 8
            crop_b = b - 44
            crop_l = l + 8
            crop_r = r - 8
            
            box = original_rgb.crop((crop_l, crop_t, crop_r, crop_b))
            
            # Convert to grayscale to use as an alpha mask for perfect anti-aliasing
            box_gray = box.convert('L')
            
            # Create a completely black image for the RGB channels
            black_img = Image.new('RGB', box.size, (0, 0, 0))
            
            # We want the black lines to be opaque, and the white paper to be transparent.
            # So Alpha = 255 - grayscale
            # But let's increase contrast so lines are fully opaque and paper is fully transparent
            # using point eval
            def adjust_contrast(px):
                # if pixel is > 200 (light gray/white), alpha becomes 0
                # if pixel is < 100 (black/dark), alpha becomes 255
                if px > 220: return 0
                if px < 100: return 255
                # linear scale in between
                return int((220 - px) * (255 / 120))
                
            alpha_mask = box_gray.point(adjust_contrast)
            
            black_img.putalpha(alpha_mask)
            
            # Save the clean transparent image
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            black_img.save(filename, "PNG")
            print(f"Saved {filename}")
            
            idx += 1

process_images()
