import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEN_API_KEY"))

def detect_ingredients(image_path):
    model = genai.GenerativeModel("models/gemini-2.5-flash")

    # Read image
    with open(image_path, "rb") as img_file:
        image_data = img_file.read()

    # Ask Gemini to identify ingredients
    prompt = (
        "Identify all visible food ingredients in this image. "
        "Return only a comma-separated list of ingredient names."
    )

    response = model.generate_content(
        [prompt, {"mime_type": "image/jpeg", "data": image_data}]
    )

    # Extract and clean ingredients
    ingredients_text = response.text.strip()
    ingredients = [i.strip().lower() for i in ingredients_text.split(",") if i.strip()]
    return ingredients

