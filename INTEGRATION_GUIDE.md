# Integration Guide

This guide explains how to work on the frontend, backend, and packaged build without relying on outdated assumptions.

## Source of truth

The current source of truth for behavior is:

- `backend/app.py`
- `backend/model/predict.py`
- `backend/utils/preprocess.py`
- `frontend/src/App.tsx`
- `frontend/vite.config.ts`
- `main.py`
- `DeepfakeDetection.spec`

## Recommended development modes

### Mode 1: Full app run

Best for:

- validating uploads
- checking prediction responses
- testing the real integrated experience

Commands:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd frontend
npm install
npm run build
cd ..
python main.py
```

Open `http://127.0.0.1:5000`.

### Mode 2: Frontend-only UI work

Best for:

- layout changes
- animation work
- component refactors that do not need real inference

Commands:

```powershell
cd frontend
npm install
npm run dev
```

Current limitation:

- The dev server runs on port `3000`
- API requests to `/api/predict` will not automatically reach Flask because there is no Vite proxy configured

## Backend integration details

The backend does all of the following:

- serves the built frontend
- accepts uploads
- sanitizes filenames with `secure_filename`
- stores uploads in a writable runtime location
- loads the model from `.keras` first, then `.h5`, then rebuilds as a fallback

## Model loading behavior

`backend/model/predict.py` loads models in this order:

1. `backend/model/deepfake_model.keras`
2. `backend/model/deepfake_model.h5`
3. rebuild from `build_deepfake_model()`

When a legacy H5 model loads successfully, the code attempts to save a `.keras` copy into a writable runtime path for future use.

## Packaging workflow

`DeepfakeDetection.spec` includes:

- the built frontend from `frontend/build`
- the model files from `backend/model`
- TensorFlow and Keras collected dependencies

Before building a packaged executable:

1. run `npm run build` in `frontend/`
2. confirm the model files exist
3. run PyInstaller with the spec file

## What is implemented today

- Integrated Flask + React app
- Prediction endpoint
- Same-origin frontend API call when served by Flask
- Packaged entrypoint support

## What is not complete today

- Vite dev proxy configuration
- Real video inference pipeline
- Automated tests
- Cleanup lifecycle for saved uploads
