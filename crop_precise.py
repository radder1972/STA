import os
from PIL import Image

def process_precise():
    img_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790268314386.png'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    # We will slice mathematically into 3x6 cells, then use getbbox() on each cell
    # to find the exact drawing bounds.
    # The header is at the top. Let's find where the non-transparent pixels start
    
    # The image is 1024x559
    # Let's just use 6 equal columns, and 3 equal rows from y=60 downwards
    
    margin_top = 60
    grid_w = width
    grid_h = height - margin_top
    
    box_w = grid_w / 6
    box_h = grid_h / 3
    
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
            
            l = int(col * box_w)
            t = int(margin_top + row * box_h)
            r = int((col + 1) * box_w)
            b = int(margin_top + (row + 1) * box_h)
            
            cell = img.crop((l, t, r, b))
            
            # Now we need to remove the text at the bottom.
            # We can scan from bottom up to find the gap between text and drawing.
            # But the easiest way is to just crop out the bottom 35 pixels of the cell.
            # Let's be careful. The text is usually the bottom 20% of the cell.
            cell_w, cell_h = cell.size
            drawing_cell = cell.crop((0, 0, cell_w, int(cell_h * 0.78)))
            
            # Now get the precise bounding box of the non-transparent drawing
            bbox = drawing_cell.getbbox()
            if bbox:
                # Add a 2px padding
                pad = 2
                final_box = (
                    max(0, bbox[0]-pad),
                    max(0, bbox[1]-pad),
                    min(cell_w, bbox[2]+pad),
                    min(int(cell_h * 0.78), bbox[3]+pad)
                )
                final_img = drawing_cell.crop(final_box)
            else:
                final_img = drawing_cell
                
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            final_img.save(filename, "PNG")
            print(f"Saved {filename} with size {final_img.size}")
            
            idx += 1

process_precise()
