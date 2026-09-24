import sys
from PIL import Image

def extract_boxes(img_path, output_dir):
    img = Image.open(img_path).convert('RGB')
    gray = img.convert('L')
    pixels = gray.load()
    width, height = img.size
    
    # Find horizontal lines that are mostly black
    horiz_lines = []
    for y in range(height):
        black_count = 0
        for x in range(width):
            if pixels[x, y] < 100:
                black_count += 1
        if black_count > width * 0.7:  # At least 70% of the line is black
            horiz_lines.append(y)
            
    # Find vertical lines that are mostly black
    vert_lines = []
    for x in range(width):
        black_count = 0
        for y in range(height):
            if pixels[x, y] < 100:
                black_count += 1
        if black_count > height * 0.7:
            vert_lines.append(x)
            
    # Cluster the lines to find the boundaries
    def cluster(lines):
        if not lines: return []
        clusters = []
        current = [lines[0]]
        for l in lines[1:]:
            if l - current[-1] < 10:
                current.append(l)
            else:
                clusters.append(int(sum(current)/len(current)))
                current = [l]
        clusters.append(int(sum(current)/len(current)))
        return clusters

    h_bounds = cluster(horiz_lines)
    v_bounds = cluster(vert_lines)
    
    print(f"H bounds: {h_bounds}")
    print(f"V bounds: {v_bounds}")
    
    if len(h_bounds) < 3 or len(v_bounds) < 6:
        # Fallback to hardcoded coordinates if detection fails
        print("Detection failed, using hardcoded coords")
        h_bounds = [65, 290, 520]
        v_bounds = [25, 220, 415, 610, 805, 1000] # Approximate
    
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Social isolation_Alienation", "Defectiveness_unlovability",
        "Practical incompetence_Dependence", "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Self-sacrifice"
    ]
    
    import os
    os.makedirs(output_dir, exist_ok=True)
    
    idx = 0
    # Expected: 2 rows (3 h_bounds), 5 cols (6 v_bounds)
    for i in range(len(h_bounds) - 1):
        for j in range(len(v_bounds) - 1):
            if idx >= len(names): break
            
            l = v_bounds[j] + 3
            r = v_bounds[j+1] - 3
            t = h_bounds[i] + 3
            b = h_bounds[i+1] - 3
            
            # Crop bottom text (approx 45px)
            b_img = b - 42
            
            box = img.crop((l, t, r, b_img))
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            box.save(filename)
            print(f"Saved {filename} with size {box.size}")
            
            idx += 1

extract_boxes('/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790266940274.png', '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas')
