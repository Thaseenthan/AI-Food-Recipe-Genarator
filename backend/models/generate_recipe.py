import google.generativeai as genai
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEN_API_KEY"))


def _extract_json(text: str):
    """Try to extract the first JSON array or object from text and parse it.
    Returns parsed object on success, or None on failure."""
    if not text or not isinstance(text, str):
        return None
    # Try to find the first JSON array or object
    m = re.search(r"(\[\s*\{.*?\}\s*\]|\{.*?\}|\[.*?\])", text, re.S)
    candidate = m.group(0) if m else text
    try:
        return json.loads(candidate)
    except Exception:
        # fallback: try to find a bracketed JSON by locating first [ and last ]
        if "[" in text and "]" in text:
            try:
                start = text.index("[")
                end = text.rindex("]") + 1
                return json.loads(text[start:end])
            except Exception:
                pass
        # try object boundaries
        if "{" in text and "}" in text:
            try:
                start = text.index("{")
                end = text.rindex("}") + 1
                return json.loads(text[start:end])
            except Exception:
                pass
    return None


def generate_recipe(ingredients):
    prompt = f"""
    You are an AI chef assistant. Based on these ingredients: {', '.join(ingredients)},
    suggest 2–3 recipes in JSON format with the following fields:
    - name
    - ingredients
    - steps
    - time (in minutes)
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)

        # Always extract plain text safely
        if hasattr(response, "text") and response.text:
            text = response.text
        elif hasattr(response, "candidates") and response.candidates:
            text = response.candidates[0].content.parts[0].text
        else:
            text = str(response)

        # Attempt to parse JSON out of the model text
        parsed = _extract_json(text)
        if parsed is None:
            # If we couldn't parse, return empty array and the raw text
            return {"recipes": [], "raw": text}

        # Normalize parsed to a list of recipes
        if isinstance(parsed, dict):
            # If dict contains a top-level 'recipes' key, use it
            if "recipes" in parsed and isinstance(parsed["recipes"], list):
                recipes_list = parsed["recipes"]
            else:
                # treat single recipe object as list
                recipes_list = [parsed]
        elif isinstance(parsed, list):
            recipes_list = parsed
        else:
            recipes_list = []

        return {"recipes": recipes_list, "raw": text}
    except Exception as e:
        # Return an informative error instead of raising — keeps the server stable
        return {"recipes": [], "raw": "", "error": str(e)}
