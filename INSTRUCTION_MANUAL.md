# DeepFake Detection System Instruction Manual

## 1. Purpose of the project

DeepFake Detection System is a web-based application that analyzes uploaded media and predicts whether the content is:

- `REAL`
- `FAKE`
- `UNCERTAIN`

The system combines:

- a Flask backend for routing, uploads, and inference
- a React frontend for the user interface
- a TensorFlow/Keras model for classification
- a PyInstaller setup for packaging the application

## 2. What the project currently does

In its current state, the project supports:

- uploading media through a browser interface
- sending the uploaded file to a Flask API
- preprocessing the file for model inference
- returning a verdict, prediction label, confidence score, and filename
- serving the compiled frontend from Flask
- packaging the app with PyInstaller

Important current reality:

- the end-to-end supported inference path is image-based
- the UI and backend allow-list mention some video formats, but the implemented preprocessing flow uses image loading logic

## 3. Technology stack

### Backend

- Python
- Flask
- Flask-CORS
- TensorFlow / Keras
- OpenCV
- Pillow

### Frontend

- React
- TypeScript
- Vite
- Motion
- Lucide React
- Radix UI components

### Packaging

- PyInstaller

## 4. Repository structure

```text
backend/
  app.py
  paths.py
  model/
    create_model.py
    model_builder.py
    predict.py
    train.py
    deepfake_model.keras
    deepfake_model.h5
  utils/
    preprocess.py

frontend/
  src/
  build/
  package.json
  vite.config.ts

main.py
DeepfakeDetection.spec
requirements.txt
setup.bat
```

## 5. How the application works

### Step 1: frontend build is served by Flask

The frontend is developed inside `frontend/`, then built into:

```text
frontend/build
```

The Flask app serves that built output as the main web interface.

### Step 2: the user uploads a file

The upload starts in the React frontend. The selected file is attached to `FormData` and sent to:

```text
POST /api/predict
```

### Step 3: Flask validates and stores the file

The backend:

- checks that a file was sent
- checks that the filename is not empty
- checks the extension against the allowed set
- sanitizes the filename with `secure_filename`
- saves the file to a writable runtime location

### Step 4: the model processes the file

The backend calls the prediction pipeline, which:

- loads the file
- converts it into the model input shape
- runs inference
- applies threshold logic

### Step 5: the backend returns JSON

The API returns a response like:

```json
{
  "verdict": "AUTHENTIC",
  "prediction": "REAL",
  "confidence": 91.42,
  "isFake": false,
  "filename": "sample.jpg"
}
```

### Step 6: the frontend renders the result

The React app displays:

- the uploaded preview
- the verdict
- the confidence score
- the uploaded filename

## 6. Backend details

### `backend/app.py`

This file is the main Flask application. It is responsible for:

- serving the built frontend
- exposing the prediction API
- validating uploads
- returning JSON responses

### `backend/paths.py`

This file separates:

- resource paths used to locate packaged project assets
- writable runtime paths used for generated files such as uploads

This design helps the same application work both in source form and in packaged form.

### `backend/utils/preprocess.py`

This file preprocesses images for the model. The current behavior includes:

- reading the image with OpenCV
- converting BGR to RGB
- resizing to `299 x 299`
- converting to float format
- adding the batch dimension
- applying Xception preprocessing

### `backend/model/predict.py`

This file handles:

- model loading
- fallback loading behavior
- prediction thresholding
- confidence calculation

The model loading order is:

1. `deepfake_model.keras`
2. `deepfake_model.h5`
3. rebuild from model code as a fallback

## 7. Prediction logic

The current thresholds are:

- `LOW = 0.45`
- `HIGH = 0.65`

Classification logic:

- if `p >= 0.65`, return `REAL`
- if `p <= 0.45`, return `FAKE`
- otherwise, return `UNCERTAIN`

Confidence behavior:

- `REAL`: confidence is based on `p * 100`
- `FAKE`: confidence is based on `(1 - p) * 100`
- `UNCERTAIN`: confidence is based on closeness to the center range

## 8. Frontend details

### `frontend/src/App.tsx`

This is the main frontend entry point. It currently:

- tracks theme state
- tracks upload state
- creates a preview of the selected file
- sends the uploaded file to `/api/predict`
- stores the API response
- displays error messages when prediction fails

### `frontend/src/components/UploadSection.tsx`

This component handles:

- drag and drop
- file selection
- loading state
- upload presentation

### `frontend/src/components/ResultsSection.tsx`

This component handles:

- image preview
- verdict display
- confidence ring
- result styling
- filename display

## 9. Supported file handling

### Backend allow-list

The current backend allow-list includes:

- `png`
- `jpg`
- `jpeg`
- `gif`
- `bmp`
- `mp4`
- `avi`
- `mov`

### Real supported inference path

The actual implemented preprocessing path is image-based. For reliable use, upload:

- `jpg`
- `jpeg`
- `png`
- `gif`
- `bmp`

Video acceptance in the current code should be treated as incomplete functionality.

## 10. How to install and run the project

## 10.1 Prerequisites

- Python 3.10 or newer recommended
- Node.js 18 or newer recommended
- npm

## 10.2 Create a virtual environment

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

## 10.3 Install Python dependencies

```powershell
pip install -r requirements.txt
```

## 10.4 Install frontend dependencies

```powershell
cd frontend
npm install
cd ..
```

## 10.5 Build the frontend

```powershell
cd frontend
npm run build
cd ..
```

This creates:

```text
frontend/build
```

## 10.6 Start the application

```powershell
python main.py
```

Then open:

```text
http://127.0.0.1:5000
```

## 11. Recommended run mode

The recommended full-project run mode is:

1. build the frontend
2. run Flask with `python main.py`
3. open the app through Flask

Reason:

- the frontend currently uses `fetch('/api/predict')`
- `frontend/vite.config.ts` does not define a dev proxy to Flask
- same-origin API calls work correctly when Flask serves the built frontend

## 12. Frontend development mode

You can still run the frontend dev server:

```powershell
cd frontend
npm run dev
```

Current limitation:

- `/api/predict` will point to the Vite server origin unless a proxy is added or the fetch URL is changed

Use this mode mainly for:

- UI changes
- styling work
- component development

## 13. API manual

### Endpoint

```http
POST /api/predict
```

### Request type

```text
multipart/form-data
```

### Required field

- `image`

### Success response

```json
{
  "verdict": "DEEPFAKE DETECTED",
  "prediction": "FAKE",
  "confidence": 87.45,
  "isFake": true,
  "filename": "test.jpg"
}
```

### Error response examples

```json
{
  "error": "No image uploaded"
}
```

```json
{
  "error": "Empty filename"
}
```

```json
{
  "error": "File type not allowed"
}
```

```json
{
  "error": "Prediction failed: ..."
}
```

### Status codes

- `200` successful prediction
- `400` invalid request
- `500` prediction or server failure

## 14. Manual API testing

### PowerShell example

```powershell
curl -X POST http://127.0.0.1:5000/api/predict
```

This should return an error if no file is provided, which confirms the route exists.

### Python example

```python
import requests

with open("sample.jpg", "rb") as f:
    response = requests.post(
        "http://127.0.0.1:5000/api/predict",
        files={"image": f},
    )

print(response.status_code)
print(response.json())
```

## 15. Packaging manual

The project includes:

- `main.py` as the entry point
- `DeepfakeDetection.spec` for PyInstaller

### What the spec includes

- `frontend/build`
- `backend/model/deepfake_model.keras`
- `backend/model/deepfake_model.h5`
- TensorFlow and Keras collected dependencies

### Packaging checklist

Before packaging:

1. build the frontend
2. confirm model files exist
3. confirm Python dependencies are installed
4. run PyInstaller using the spec file

### Important note

If `frontend/build` does not exist, the packaged app will not have the compiled frontend interface it expects.

## 16. Troubleshooting guide

### Problem: frontend page does not load through Flask

Possible cause:

- `frontend/build` does not exist

Fix:

```powershell
cd frontend
npm run build
cd ..
python main.py
```

### Problem: upload returns `File type not allowed`

Possible cause:

- unsupported extension

Fix:

- use a supported image file such as `jpg`, `jpeg`, or `png`

### Problem: prediction fails

Possible causes:

- model file missing
- unreadable image
- invalid media type

Fix:

- confirm `backend/model/deepfake_model.keras` exists
- confirm `backend/model/deepfake_model.h5` exists as fallback
- test with a normal image file

### Problem: frontend dev server cannot reach backend

Possible cause:

- no Vite proxy is configured

Fix options:

- test through Flask instead of the dev server
- add a Vite proxy for `/api`
- change the frontend fetch URL to an explicit backend URL

## 17. Known limitations

- the main reliable inference path is image-based
- video upload support is not complete
- the Vite dev server is not fully integrated with Flask by default
- automated tests are not currently present
- upload cleanup is not yet formalized
- the frontend includes placeholders for detailed metrics that are not yet returned by the backend

## 18. Recommended future improvements

- add a Vite proxy for `/api`
- separate image and video workflows clearly
- implement true video frame processing
- add automated tests for startup and `/api/predict`
- add cleanup for saved uploads
- add typed frontend response models instead of `any`
- improve production deployment guidance

## 19. Best practices for contributors

- build the frontend before testing the full app
- use image files for reliable prediction testing
- treat video handling as unfinished unless you extend the backend pipeline
- verify documentation against code when making architecture changes
- keep the backend API contract stable when updating the frontend

## 20. Quick command reference

### Full setup

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

### Frontend dev only

```powershell
cd frontend
npm install
npm run dev
```

### Main application URL

```text
http://127.0.0.1:5000
```

## 21. Final summary

This project is currently best understood as a Flask-served React application with a TensorFlow-based image classification backend. The source code, build flow, and packaging flow are already connected, but contributors should work with the current limitations in mind:

- build the frontend before full testing
- run the integrated app through Flask
- use image uploads for reliable results
- do not assume video inference is complete

This manual is based on the current repository state and is intended to serve as a full working guide for development, usage, and project handoff.
