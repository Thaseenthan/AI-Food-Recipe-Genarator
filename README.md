# 🍳 AI Food Recipe Generator

An AI-powered web application that detects ingredients from food images and generates customized recipes using Google's Gemini AI.

---

## 📦 Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

---

## 🚀 Setup & Installation

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install Python packages:**
```bash
pip install fastapi uvicorn pydantic python-dotenv google-generativeai pillow python-multipart
```

Or using requirements.txt:
```bash
pip install -r requirements.txt
```

3. **Create `.env` file:**
```bash
# Create .env file in backend folder
GEN_API_KEY=your-google-gemini-api-key-here
SUPABASE_BUCKET=recipe-images
```

4. **Run the backend server:**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at: `http://localhost:8000`

---

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd frontend
```

2. **Install Node packages:**
```bash
npm install
```

Required packages:
- axios
- framer-motion
- react
- react-dom
- react-icons
- react-router-dom
- vite
- tailwindcss
- typescript

3. **Run the frontend development server:**
```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🎯 Quick Start

### Running Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Then open your browser to: `http://localhost:5173`

---

## 📝 Environment Variables

### Backend (`.env` in backend folder)
```env
GEN_API_KEY=your-google-gemini-api-key
SUPABASE_BUCKET=recipe-images
```

### Frontend (`.env` in frontend folder - optional)
```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🛠️ Project Structure

```
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables (create this)
│   ├── models/              # AI models
│   │   ├── detect_ingredients.py
│   │   └── generate_recipe.py
│   └── database/            # Database config
│
└── frontend/
    ├── package.json         # Node dependencies
    ├── src/
    │   ├── App.tsx          # Main app component
    │   ├── api.ts           # API calls
    │   ├── components/      # React components
    │   └── pages/           # Page components
    └── public/              # Static assets
```

---

## 🌐 API Documentation

Once backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 📋 Features

- 📸 Upload food ingredient images
- 🤖 AI-powered ingredient detection (Google Gemini Vision)
- 🍽️ Automatic recipe generation
- 📋 Copy recipes to clipboard
- 🌙 Dark mode support
- 📱 Responsive design

---

## 🐛 Troubleshooting

**Backend not starting?**
- Check if Python 3.10+ is installed: `python --version`
- Verify `.env` file exists with valid API key
- Make sure port 8000 is not in use

**Frontend not starting?**
- Check if Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`

**API connection errors?**
- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify `VITE_API_URL` in frontend (if using custom URL)

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Thaseenthan S.**

---

## 🙏 Acknowledgments

- Google Gemini AI
- FastAPI
- React + Vite
- Tailwind CSS