# UI Integration Guide

This guide explains how the React UI has been integrated with the Flask backend.

## What Changed

### Backend Updates (`backend/app.py`)
1. **CORS Support**: Added `flask-cors` to allow requests from the React frontend
2. **API Endpoint**: Updated `/predict` to `/api/predict` for better organization
3. **Static File Serving**: Configured Flask to serve the built React app from `dist` folder
4. **Enhanced Response**: API now returns structured data matching the UI expectations:
   - `verdict`: "DEEPFAKE DETECTED" or "AUTHENTIC"
   - `prediction`: "fake" or "real"
   - `confidence`: numeric confidence score
   - `filename`: uploaded file name

### Frontend Updates (`AI Deepfake Detection UI/src/App.tsx`)
1. **Real API Calls**: Replaced mock data with actual calls to `/api/predict`
2. **FormData Upload**: Sends files to backend using proper multipart form data
3. **Error Handling**: Gracefully handles API errors and displays error messages
4. **Dynamic Details**: Derives detailed metrics from the confidence score

### Frontend Updates (`AI Deepfake Detection UI/src/components/ResultsSection.tsx`)
1. **Error Display**: Shows user-friendly error messages when analysis fails
2. **Error State Handling**: Detects and displays error conditions

### Dependencies (`requirements.txt`)
- Added `flask-cors==4.0.0` for cross-origin requests

## Setup & Running

### Development Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Node.js dependencies for the UI:**
   ```bash
   cd "AI Deepfake Detection UI"
   npm install
   ```

3. **Run the backend and frontend separately during development:**
   
   **Terminal 1 - Start the Flask backend:**
   ```bash
   python -m backend.app
   ```
   The backend will run on `http://localhost:5000`

   **Terminal 2 - Start the React development server:**
   ```bash
   cd "AI Deepfake Detection UI"
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or similar, check output)

### Production Setup

1. **Build the React app:**
   ```bash
   cd "AI Deepfake Detection UI"
   npm run build
   ```
   This creates a `dist` folder with the optimized React app.

2. **Run the Flask backend:**
   ```bash
   python -m backend.app
   ```
   Flask will serve:
   - The built React app from the `dist` folder at `/`
   - API endpoints at `/api/predict`

## Project Structure

```
backend/
├── app.py              # Flask app with API endpoints
├── model/
│   ├── predict.py      # Prediction logic
│   └── deepfake_model.keras
├── utils/
│   └── preprocess.py   # Image preprocessing
└── uploads/           # Uploaded files storage

AI Deepfake Detection UI/
├── src/
│   ├── App.tsx              # Main app component with API integration
│   ├── components/
│   │   ├── ResultsSection.tsx  # Results display with error handling
│   │   └── ...
│   └── main.tsx
├── dist/              # Built React app (created after npm run build)
├── package.json
└── vite.config.ts

requirements.txt       # Python dependencies
```

## API Contract

### Upload & Predict
**Endpoint:** `POST /api/predict`

**Request:**
```
Content-Type: multipart/form-data
image: <file>
```

**Response (Success):**
```json
{
  "verdict": "DEEPFAKE DETECTED|AUTHENTIC",
  "prediction": "fake|real",
  "confidence": 0.95,
  "filename": "image.jpg"
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

## Development Tips

- The React app uses Vite for fast development
- Flask backend has CORS enabled for development requests
- API calls default to the same origin (`/api/predict`)
- During development, both servers run independently but on the same port configuration
- File uploads are saved to `backend/uploads/` folder

## Building for Deployment

1. Build the React app: `npm run build` in UI folder
2. The Flask app will automatically serve the built app
3. Deploy the entire project directory with the `dist` folder included

---

For more details, refer to the original README.md files in each folder.
