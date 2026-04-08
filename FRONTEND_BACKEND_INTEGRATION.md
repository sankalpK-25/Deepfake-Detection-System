# Frontend-Backend Integration Guide

## Overview
This document describes the seamless integration between the React TypeScript frontend and Flask Python backend for the DeepFake Detection System. The integration ensures consistent data flow while preserving the model's accuracy and prediction thresholds.

## Architecture

### Backend (Flask)
- **API Endpoint**: `POST /api/predict`
- **Model Path**: `backend/model/deepfake_model.keras` or `backend/model/deepfake_model.h5`
- **Prediction Logic**: Untouched - preserves original thresholds and accuracy

### Frontend (React/TypeScript)
- **Dev Server**: Runs on `http://localhost:5173` (default Vite port)
- **API Base URL**: `http://localhost:5000` (Flask backend)
- **UI Library**: React with Framer Motion for animations

## Data Flow

### 1. File Upload
```
User uploads file (drag & drop or file input)
    ↓
UploadSection.tsx validates file type (image/video)
    ↓
App.tsx receives file via handleFileUpload()
```

### 2. API Request
```
App.tsx creates FormData with image file
    ↓
POST request sent to http://localhost:5000/api/predict
    ↓
Flask backend receives file in request.files["image"]
```

### 3. Model Prediction
```
Flask saves file securely to backend/uploads/
    ↓
predict_image(filepath) processes the image
    ↓
Image preprocessing (299x299 resize, Xception normalization)
    ↓
Model prediction (binary classification)
    ↓
Thresholds applied:
  - p >= 0.65: REAL (confidence = p * 100)
  - p <= 0.45: FAKE (confidence = (1-p) * 100)
  - 0.45 < p < 0.65: UNCERTAIN
```

### 4. API Response
```
Flask returns JSON response:
{
  "verdict": "DEEPFAKE DETECTED" | "AUTHENTIC" | "INCONCLUSIVE",
  "prediction": "FAKE" | "REAL" | "UNCERTAIN",
  "confidence": <0-100>,
  "isFake": <boolean>,
  "filename": <original_filename>
}
```

### 5. Frontend Display
```
App.tsx receives response
    ↓
setAnalysisResult() updates state with results
    ↓
ResultsSection.tsx renders results:
  - Verdict with icon (red alert or green check)
  - Confidence percentage in circular progress ring
  - Filename display
  - Error handling with user-friendly messages
```

## Changes Made

### Backend Changes

#### 1. **backend/app.py**
- Added `from flask_cors import CORS` import
- Initialized CORS with allowed origins for development:
  - `http://localhost:5173` (Vite default)
  - `http://localhost:5174` (alternative port)
  - `http://localhost:3000` (common React port)
  - `127.0.0.1` variants for local testing

- Changed route from `/predict` → `/api/predict`
- Enhanced response to include `isFake` boolean for easier frontend logic
- Added verdict mapping for user-friendly messages:
  - "REAL" → "AUTHENTIC"
  - "FAKE" → "DEEPFAKE DETECTED"
  - "UNCERTAIN" → "INCONCLUSIVE"

#### 2. **requirements.txt**
- Added `flask-cors==4.0.0` for CORS support

### Frontend Changes

#### 1. **frontend/src/App.tsx**
- Replaced mock data generation with real API calls
- Added `error` state for error handling
- Implemented `handleFileUpload()`:
  ```typescript
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    body: formData,
  });
  ```
- Added error display notification at top of page
- Properly handles response and sets analysis result

#### 2. **frontend/src/components/ResultsSection.tsx**
- Updated to handle real API response (which doesn't include detailed metrics)
- Made detailed analysis metrics section conditional
- Added filename display in verdict card
- Preserved all animations and visual feedback

## Model Accuracy Preservation

### Prediction Thresholds (NOT MODIFIED)
```python
LOW = 0.45   # Threshold for FAKE classification
HIGH = 0.65  # Threshold for REAL classification
```

### Confidence Calculation (NOT MODIFIED)
- **REAL** (p >= 0.65): `confidence = p * 100`
- **FAKE** (p <= 0.45): `confidence = (1 - p) * 100`
- **UNCERTAIN** (0.45 < p < 0.65): `confidence = (1 - abs(p - 0.5) / 0.15) * 100`

### Image Preprocessing (NOT MODIFIED)
- Resize to 299x299 (Xception input size)
- Convert BGR → RGB
- Apply Xception preprocessing normalization

## How to Run

### 1. Install Dependencies

#### Backend
```bash
cd d:\python\DeepFake-Detection-System-Draft-4
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Start Backend Server
```bash
# From root directory with venv activated
python -m backend.app
# Server runs on http://localhost:5000
```

### 3. Start Frontend Development Server
```bash
# From frontend directory
npm run dev
# Server runs on http://localhost:5173
```

### 4. Open in Browser
- Navigate to `http://localhost:5173`
- Upload an image via drag-and-drop or file input
- View real-time prediction results

## Configuration

### Backend CORS Origins
To add more origins (e.g., production domains), modify `backend/app.py`:
```python
CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:3000",
    # Add production URLs here
    "https://yourdomain.com"
]}})
```

### API Base URL
To change the API endpoint URL in frontend, update `App.tsx`:
```typescript
const response = await fetch('http://your-api-url/api/predict', {
  method: 'POST',
  body: formData,
});
```

## Error Handling

### Network Errors
- User sees error notification at top of page
- Error message displayed: "An error occurred during analysis"
- Error logged to browser console for debugging

### File Upload Errors
- Backend validates file extensions
- Returns 400 Bad Request with error message
- Frontend displays user-friendly error notification

### Model Errors
- If prediction fails, backend returns 500 Internal Server Error
- Frontend displays error message
- Check backend logs for detailed error information

## Files Modified Summary

| File | Changes |
|------|---------|
| `backend/app.py` | Added CORS, updated endpoint to `/api/predict`, enhanced response |
| `requirements.txt` | Added `flask-cors==4.0.0` |
| `frontend/src/App.tsx` | Replaced mock data with real API integration |
| `frontend/src/components/ResultsSection.tsx` | Made metrics conditional, added filename display |

## Files NOT Modified (Preserving Accuracy)

| File | Reason |
|------|--------|
| `backend/model/predict.py` | All thresholds and prediction logic preserved |
| `backend/utils/preprocess.py` | Image preprocessing unchanged |
| `backend/model/deepfake_model.h5/.keras` | Model weights untouched |
| `backend/model/model_builder.py` | Model architecture unchanged |

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend development server starts without errors
- [ ] No CORS errors in browser console
- [ ] Can upload image files
- [ ] Backend receives file and processes it
- [ ] Frontend displays prediction results
- [ ] Confidence percentage displays correctly
- [ ] Error handling works for invalid files
- [ ] Theme toggle (dark/light) works
- [ ] Responsive design works on different screen sizes
- [ ] Model predictions match expected values

## Common Issues & Solutions

### CORS Error
**Problem**: `Access to XMLHttpRequest has been blocked by CORS policy`
**Solution**: Ensure backend is running on `http://localhost:5000` and frontend on `http://localhost:5173`

### File Not Found Error
**Problem**: `[Errno 2] No such file or directory: 'backend/uploads/...`
**Solution**: `backend/uploads/` directory is created automatically by Flask if it doesn't exist

### Model Load Error
**Problem**: `Failed to load .keras model` or `Failed to load H5 model`
**Solution**: Ensure model files exist in `backend/model/`. If missing, rebuild from `backend/model/model_builder.py`

### Prediction Timeout
**Problem**: Request takes too long or times out
**Solution**: Model inference can take 10-30 seconds depending on system. Increase fetch timeout if needed:
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 60000); // 60 seconds
const response = await fetch('...', { signal: controller.signal });
```

## Future Enhancements

- [ ] Add batch processing for multiple files
- [ ] Implement video frame extraction and processing
- [ ] Add detailed metrics from model layer outputs
- [ ] Implement result caching
- [ ] Add user session management
- [ ] Add result history/gallery
- [ ] Implement progress bar with actual model inference progress
- [ ] Add visualization of what features model is detecting
