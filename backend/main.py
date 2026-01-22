from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import uuid
from datetime import datetime
from models.detect_ingredients import detect_ingredients
from models.generate_recipe import generate_recipe
from database.db_config import supabase
from dotenv import load_dotenv

load_dotenv()
SUPABASE_BUCKET = os.getenv("SUPABASE_BUCKET", "recipe-images")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    print(f"📤 Upload request received: {file.filename}")
    try:
        # Generate unique filename
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        print(f"🔑 Generated unique filename: {unique_filename}")
        
        # Read file content
        file_content = await file.read()
        print(f"📁 File read: {len(file_content)} bytes")
        
        # Save locally first
        local_path = f"static/uploads/{unique_filename}"
        os.makedirs("static/uploads", exist_ok=True)
        with open(local_path, "wb") as buffer:
            buffer.write(file_content)
        print(f"💾 Saved locally: {local_path}")
        
        # Try to upload to Supabase Storage
        public_url = None
        try:
            print(f"☁️ Uploading to Supabase Storage bucket: {SUPABASE_BUCKET}")
            storage_response = supabase.storage.from_(SUPABASE_BUCKET).upload(
                unique_filename,
                file_content,
                {"content-type": file.content_type}
            )
            print(f"✅ Uploaded to Supabase Storage")
            
            # Get public URL
            public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(unique_filename)
            print(f"🔗 Public URL: {public_url}")
        except Exception as upload_error:
            print(f"⚠️ Supabase upload failed: {str(upload_error)}")
            print(f"📝 Using local file path as fallback")
            # Use local path as fallback
            public_url = f"/static/uploads/{unique_filename}"
        
        # Detect ingredients
        print(f"🔍 Detecting ingredients...")
        ingredients = detect_ingredients(local_path)
        print(f"✅ Detected ingredients: {ingredients}")
        
        # Generate recipe
        print(f"🍳 Generating recipes...")
        gen_result = generate_recipe(ingredients)
        print(f"✅ Recipe generation result: {type(gen_result)}")

        # gen_result should be a dict with keys: recipes (list) and raw (str)
        if isinstance(gen_result, dict):
            recipes = gen_result.get("recipes", [])
            raw = gen_result.get("raw", "")
            error = gen_result.get("error")
            print(f"📊 Recipes count: {len(recipes)}, Error: {error}")
        else:
            # fallback: if generate_recipe returns raw text
            recipes = []
            raw = str(gen_result)
            error = None
            print(f"⚠️ Unexpected result type, using fallback")

        return {
            "ingredients": ingredients, 
            "recipes": recipes, 
            "raw": raw, 
            "error": error,
            "image_url": public_url
        }
    except Exception as e:
        print(f"❌ ERROR in upload endpoint: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root():
    """Redirect root to the interactive docs for convenience."""
    return RedirectResponse(url="/docs")

# ===== COMMENTED OUT: SUPABASE FAVORITES FUNCTIONALITY =====
# Uncomment these endpoints when you have Supabase properly configured

# @app.post("/save_favorite")
# async def save_favorite(recipe: dict):
#     print(f"💾 Save favorite request received")
#     print(f"📦 Recipe data: {recipe}")
#     try:
#         # Add timestamp
#         recipe["created_at"] = datetime.now().isoformat()
#         recipe["updated_at"] = datetime.now().isoformat()
#         
#         print(f"🔄 Inserting into Supabase...")
#         # Insert into Supabase
#         result = supabase.table("favorites").insert(recipe).execute()
#         
#         print(f"✅ Supabase response: {result}")
#         
#         if result.data:
#             print(f"✅ Recipe saved successfully with id: {result.data[0]['id']}")
#             return {"message": "Recipe saved successfully", "id": result.data[0]["id"]}
#         else:
#             print(f"❌ No data returned from Supabase")
#             raise HTTPException(status_code=500, detail="Failed to save recipe")
#     except Exception as e:
#         print(f"❌ Error saving favorite: {str(e)}")
#         import traceback
#         traceback.print_exc()
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/get_favorites")
# async def get_favorites():
#     try:
#         # Fetch all favorites from Supabase, ordered by most recent first
#         result = supabase.table("favorites").select("*").order("created_at", desc=True).execute()
#         
#         # Format the response
#         favorites = []
#         for item in result.data:
#             favorites.append({
#                 "id": item["id"],
#                 "title": item.get("title"),
#                 "ingredients": item.get("ingredients", []),
#                 "instructions": item.get("instructions"),
#                 "cooking_time": item.get("cooking_time"),
#                 "servings": item.get("servings"),
#                 "difficulty": item.get("difficulty"),
#                 "image_url": item.get("image_url"),
#                 "created_at": item.get("created_at")
#             })
#         
#         return {"favorites": favorites}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @app.delete("/delete_favorite/{fav_id}")
# async def delete_favorite(fav_id: str):
#     try:
#         # Delete from Supabase
#         result = supabase.table("favorites").delete().eq("id", fav_id).execute()
#         
#         if result.data:
#             return {"message": "Recipe deleted successfully"}
#         else:
#             raise HTTPException(status_code=404, detail="Favorite not found")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
