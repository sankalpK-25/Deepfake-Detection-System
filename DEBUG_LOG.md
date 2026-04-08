# Debug Log

This file records the important debugging realities of the current codebase so contributors do not repeat the same confusion.

## Current known issues

### 1. Vite dev mode is not wired to the Flask API

Reason:

- `frontend/src/App.tsx` calls `fetch('/api/predict')`
- `frontend/vite.config.ts` does not define a proxy for `/api`

Impact:

- Running `npm run dev` alone is fine for UI work
- It is not the reliable end-to-end path for prediction testing

### 2. Video uploads are not a complete feature yet

Reason:

- the upload UI accepts video MIME types
- `backend/app.py` allow-lists `mp4`, `avi`, and `mov`
- `backend/utils/preprocess.py` reads media with `cv2.imread()` and preprocesses a single image tensor

Impact:

- image uploads are the supported inference path
- video handling should be treated as unfinished

### 3. Frontend build is required for the main integrated run

Reason:

- Flask serves `frontend/build`

Impact:

- if `frontend/build` is missing, the app cannot serve the frontend correctly
- run `npm run build` before `python main.py` or before packaging

## Useful checks

### Backend

```powershell
python main.py
curl -X POST http://127.0.0.1:5000/api/predict
```

### Frontend

```powershell
cd frontend
npm install
npm run build
```

## Suggested future fixes

- add a Vite proxy for `/api`
- split video upload support from image inference until real video processing exists
- add automated smoke tests for startup and `/api/predict`
