# DeepFake Detection System

DeepFake Detection System is a Flask + React application for classifying uploaded media as `REAL`, `FAKE`, or `UNCERTAIN` with a TensorFlow/Keras model.

The repository currently contains:

- A Python backend in `backend/`
- A Vite + React frontend in `frontend/`
- A packaged desktop/server entrypoint in `main.py`
- A PyInstaller spec in `DeepfakeDetection.spec`

## Current architecture

The production-style flow in this repo is:

1. Build the frontend into `frontend/build`
2. Run the Flask app
3. Flask serves the built frontend and exposes `POST /api/predict`

Important notes about the current state:

- The frontend uses `fetch('/api/predict')`, so the safest way to run the full app is through Flask on `http://127.0.0.1:5000`
- `frontend/vite.config.ts` does not currently define a backend proxy for local dev
- The backend and upload UI list some video extensions, but the inference pipeline in `backend/utils/preprocess.py` is image-based today

## Features

- Image upload and prediction
- REAL / FAKE / UNCERTAIN classification
- Confidence score output
- Built frontend served by Flask
- Same codebase can be packaged with PyInstaller
- Animated React UI with theme toggle

## Tech stack

- Backend: Flask, Flask-CORS, TensorFlow, OpenCV, Pillow
- Frontend: React, TypeScript, Vite
- Packaging: PyInstaller

## Recommended local run

### 1. Create and activate a virtual environment

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Python dependencies

```powershell
pip install -r requirements.txt
```

### 3. Install frontend dependencies

```powershell
cd frontend
npm install
npm run build
cd ..
```

### 4. Start the app

```powershell
python main.py
```

Open:

- `http://127.0.0.1:5000`

## Frontend-only development

You can run the Vite dev server with:

```powershell
cd frontend
npm run dev
```

Current limitation:

- `fetch('/api/predict')` will hit the Vite server origin unless you add a Vite proxy or change the frontend request URL to point at the Flask server

## API

### `POST /api/predict`

Send multipart form data with a file field named `image`.

Example response:

```json
{
  "verdict": "AUTHENTIC",
  "prediction": "REAL",
  "confidence": 91.42,
  "isFake": false,
  "filename": "sample.jpg"
}
```

## Model behavior

The prediction thresholds in `backend/model/predict.py` are:

- `LOW = 0.45`
- `HIGH = 0.65`

Classification logic:

- `p >= 0.65` -> `REAL`
- `p <= 0.45` -> `FAKE`
- otherwise -> `UNCERTAIN`

Images are preprocessed to `299x299` using Xception preprocessing.

## Packaging

`DeepfakeDetection.spec` packages:

- `main.py`
- `frontend/build`
- `backend/model/deepfake_model.keras`
- `backend/model/deepfake_model.h5`

Before packaging, make sure `frontend/build` exists.

## Project structure

```text
backend/
  app.py
  paths.py
  model/
  utils/
frontend/
  src/
  build/
  package.json
main.py
DeepfakeDetection.spec
requirements.txt
```

## Known limitations

- Video files are not part of a complete inference pipeline yet
- The Vite dev server is not wired to the Flask backend by default
- There are no automated tests in the repository at the moment

## Documentation

- `QUICK_START.md` - fastest working setup
- `API_ARCHITECTURE.md` - API and runtime flow
- `FRONTEND_BACKEND_INTEGRATION.md` - frontend/backend behavior
- `INTEGRATION_GUIDE.md` - development and packaging notes
- `INTEGRATION_STATUS.md` - verification checklist
- `COMPLETE_CHECKLIST.md` - GitHub/release checklist
- `DEBUG_LOG.md` - current debugging notes and known issues
