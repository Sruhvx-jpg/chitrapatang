import os
from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if the pixel is white or near-white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    brand_dir = "/home/dron/Documents/programming/chitrapatang/apps/coming-soon/brand"
    make_transparent(
        os.path.join(brand_dir, "butterfly_solid.png"),
        os.path.join(brand_dir, "logo_transparent.png")
    )
