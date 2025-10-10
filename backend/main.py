from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
from models.detect_ingredients import detect_ingredients
from models.generate_recipe import generate_recipe
from database.db_config import favorites_collection
from bson import ObjectId

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_path = f"static/uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ingredients = detect_ingredients(file_path)
    gen_result = generate_recipe(ingredients)

    # gen_result should be a dict with keys: recipes (list) and raw (str)
    if isinstance(gen_result, dict):
        recipes = gen_result.get("recipes", [])
        raw = gen_result.get("raw", "")
        error = gen_result.get("error")
    else:
        # fallback: if generate_recipe returns raw text
        recipes = []
        raw = str(gen_result)
        error = None

    return {"ingredients": ingredients, "recipes": recipes, "raw": raw, "error": error}


@app.get("/")
async def root():
    """Redirect root to the interactive docs for convenience."""
    return RedirectResponse(url="/docs")

@app.post("/save_favorite")
async def save_favorite(recipe: dict):
    favorites_collection.insert_one(recipe)
    return {"message": "Recipe saved successfully"}

@app.get("/get_favorites")
async def get_favorites():
    # return favorites and include stringified _id for frontend operations
    recipes = list(favorites_collection.find({}, { }))
    # convert ObjectId to string and remove internal fields if needed
    out = []
    for r in recipes:
        item = {k: v for k, v in r.items() if k != "_id"}
        item["_id"] = str(r.get("_id"))
        out.append(item)
    return {"favorites": out}


@app.delete("/delete_favorite/{fav_id}")
async def delete_favorite(fav_id: str):
    try:
        result = favorites_collection.delete_one({"_id": ObjectId(fav_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id")
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return {"message": "Deleted"}
