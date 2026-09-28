import os
import glob
from PIL import Image

def process_images():
    # Find all PNGs in the specified directories
    base_dir = 'src/assets/images'
    directories = ['schemas', 'modes', 'modicategorieen', 'basisbehoeften']
    
    threshold = 25
    processed_count = 0
    
    for directory in directories:
        pattern = os.path.join(base_dir, directory, '*.png')
        for filepath in glob.glob(pattern):
            try:
                img = Image.open(filepath).convert("RGBA")
                data = list(img.getdata())
                
                new_data = []
                for p in data:
                    r, g, b, a = p
                    if a < threshold:
                        new_data.append((0, 0, 0, 0))
                    else:
                        # Optional: smooth the transition so we don't get hard edges
                        # new_a = int((a - threshold) * (255 / (255 - threshold)))
                        # new_data.append((0, 0, 0, new_a))
                        
                        # Let's just use the smooth transition to be safe and avoid jagged edges
                        new_a = int((a - threshold) * (255 / (255 - threshold)))
                        new_data.append((0, 0, 0, new_a))
                        
                img.putdata(new_data)
                img.save(filepath)
                processed_count += 1
                
            except Exception as e:
                print(f"Error processing {filepath}: {e}")
                
    print(f"Successfully cleaned alpha channel for {processed_count} images.")

if __name__ == '__main__':
    process_images()
