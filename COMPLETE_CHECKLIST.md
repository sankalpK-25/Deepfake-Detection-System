# Complete Checklist

Use this checklist before pushing the project, sharing it on GitHub, or preparing a packaged build.

## Repository hygiene

- [ ] `.gitignore` is up to date
- [ ] `node_modules/`, `build/`, `dist/`, uploads, and virtualenv folders are not tracked
- [ ] large archives and generated files are excluded
- [ ] documentation matches the codebase

## Backend

- [ ] `requirements.txt` installs cleanly
- [ ] `backend/model/deepfake_model.keras` or `backend/model/deepfake_model.h5` exists
- [ ] `backend/app.py` starts without import errors
- [ ] `POST /api/predict` handles valid image uploads
- [ ] invalid files return clear JSON errors

## Frontend

- [ ] `frontend/package.json` installs cleanly
- [ ] `npm run build` succeeds
- [ ] `frontend/build` contains the compiled app
- [ ] upload flow works through the Flask-served app
- [ ] result screen shows verdict, confidence, and filename

## Integration

- [ ] Flask serves the built frontend correctly
- [ ] same-origin `fetch('/api/predict')` works through Flask
- [ ] contributors understand that Vite dev mode needs a proxy or URL change for API testing
- [ ] contributors understand that video inference is not complete yet

## Packaging

- [ ] `frontend/build` exists before packaging
- [ ] model files exist before packaging
- [ ] `DeepfakeDetection.spec` still matches the current asset locations
- [ ] packaged output launches and can access frontend assets

## GitHub readiness

- [ ] `README.md` explains how to run the project today
- [ ] setup docs avoid outdated paths or ports
- [ ] docs describe real limitations instead of overpromising features
- [ ] screenshots, demos, or release assets are optional but current
