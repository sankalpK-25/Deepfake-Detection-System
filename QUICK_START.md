# Quick Start

This is the fastest reliable way to run the project in its current state.

## Recommended flow

Use the built frontend served by Flask. This matches how `backend/app.py` is configured and how `main.py` starts the app.

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## Setup

### 1. Create a virtual environment

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install backend dependencies

```powershell
pip install -r requirements.txt
```

### 3. Install and build the frontend

```powershell
cd frontend
npm install
npm run build
cd ..
```

### 4. Run the app

```powershell
python main.py
```

Open `http://127.0.0.1:5000`.

## What to expect

- Flask starts on port `5000`
- The homepage is served from `frontend/build/index.html`
- Uploading an image sends `POST /api/predict`
- The result includes verdict, raw prediction, confidence, and filename

## Quick API check

If the server is running, this should return a validation error because no file was sent:

```powershell
curl -X POST http://127.0.0.1:5000/api/predict
```

Expected shape:

```json
{
  "error": "No image uploaded"
}
```

## Frontend development note

You can still run:

```powershell
cd frontend
npm run dev
```

But the current frontend code uses `fetch('/api/predict')`, and `vite.config.ts` does not define a proxy to Flask. End-to-end prediction testing should therefore be done through `python main.py` unless you add a proxy or change the request URL.

## Supported uploads today

Reliable path:

- Images: `jpg`, `jpeg`, `png`, `gif`, `bmp`

Current limitation:

- The backend allow-list also includes `mp4`, `avi`, and `mov`, but the actual preprocessing/prediction path is image-based right now

## Common issues

### `TemplateNotFound: index.html`

Run `npm run build` inside `frontend/` first.

### `Prediction failed`

Check that:

- `backend/model/deepfake_model.keras` or `backend/model/deepfake_model.h5` exists
- the uploaded file is a readable image

### Frontend works but API does not from Vite

That is expected with the current config unless you add a dev proxy.
