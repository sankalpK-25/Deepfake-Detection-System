# Integration Summary

## Current state

The repository is already integrated around a Flask-served frontend build.

What that means in practice:

- `main.py` starts the Flask app on `127.0.0.1:5000`
- `backend/app.py` serves `frontend/build`
- the frontend sends uploads to `POST /api/predict`
- the backend returns verdict, prediction, confidence, `isFake`, and filename

## Confirmed implementation details

- Frontend framework: React + TypeScript + Vite
- Backend framework: Flask
- Inference stack: TensorFlow/Keras + OpenCV preprocessing
- Packaging path: PyInstaller via `DeepfakeDetection.spec`

## Main caveats

- The Vite dev server is not configured to proxy API traffic to Flask
- Video extensions appear in the UI/backend allow-list, but the preprocessing code is image-based
- The frontend has placeholders for detailed metrics that the backend does not currently supply

## Recommended use

For the current codebase:

1. build the frontend
2. run `python main.py`
3. test on `http://127.0.0.1:5000`

## Repository docs

- `README.md` for overview
- `QUICK_START.md` for setup
- `API_ARCHITECTURE.md` for API details
- `FRONTEND_BACKEND_INTEGRATION.md` for request flow
- `INTEGRATION_GUIDE.md` for contributor guidance
