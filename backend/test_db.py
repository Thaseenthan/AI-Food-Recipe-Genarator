from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get URI from .env
MONGO_URI = os.getenv("MONGO_URI")

try:
    client = MongoClient(MONGO_URI)
    # Try to connect and run a simple command
    client.admin.command('ping')
    print("✅ MongoDB connection successful!")
    
    # Optional: print database names
    print("Databases:", client.list_database_names())

except Exception as e:
    print("❌ MongoDB connection failed!")
    print("Error:", e)
