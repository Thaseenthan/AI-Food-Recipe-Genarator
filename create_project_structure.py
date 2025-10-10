import os

# Base project folder
base_dir = "AI-Food-Recipe-Generator"

# Folder structure as nested dictionaries
folders = {
    "frontend": {
        "src": {
            "components": ["UploadSection.js", "RecipeCard.js", "Navbar.js"],
            "pages": ["Home.js", "FavoritesPage.js"],
            "api.js": None,
            "App.js": None,
            "index.js": None,
            "styles.css": None
        },
        "package.json": None,
        "tailwind.config.js": None
    },
    "backend": {
        "models": ["detect_ingredients.py", "generate_recipe.py"],
        "database": ["db_config.py"],
        "static": {"uploads": {}},
        "main.py": None,
        "requirements.txt": None
    },
    "README.md": None
}

def create_structure(base, struct):
    for key, value in struct.items():
        path = os.path.join(base, key)
        if isinstance(value, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, value)
        elif isinstance(value, list):
            os.makedirs(path, exist_ok=True)
            for file in value:
                file_path = os.path.join(path, file)
                open(file_path, 'a').close()
        elif value is None:
            # It's a single file in current directory
            open(path, 'a').close()

# Create the project folders/files
create_structure(".", folders)

print("Folder structure created successfully!")
