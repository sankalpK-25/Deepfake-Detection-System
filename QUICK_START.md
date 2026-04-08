# Quick Start Guide - Frontend-Backend Integration

## Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm
- Git (optional)

## Setup & Run in 5 Minutes

### Step 1: Install Backend Dependencies
```powershell
# Navigate to project root
cd d:\python\DeepFake-Detection-System-Draft-4

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install requirements (includes new flask-cors)
pip install -r requirements.txt
```

### Step 2: Install Frontend Dependencies
```powershell
# In a new terminal, navigate to frontend
cd d:\python\DeepFake-Detection-System-Draft-4\frontend

# Install npm packages
npm install
```

### Step 3: Start Backend Server
```powershell
# From project root with venv activated
python -m backend.app
```

You should see:
```
 * Running on http://127.0.0.1:5000
✓ Model loaded from .keras format
```

### Step 4: Start Frontend Development Server
```powershell
# From frontend directory (new terminal)
npm run dev
```

You should see:
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

### Step 5: Open Browser
- Visit `http://localhost:5173`
- Upload an image file
- Wait for prediction results

## What Changed vs. Before

### Before (Mock Data)
```
User uploads image → Frontend simulates 3 second delay → Shows random results
```

### After (Real Integration)
```
User uploads image → Sent to Flask backend → Model processes image → 
Real prediction returned → Frontend displays actual result
```

## Testing the Integration

### Test Image 1: Verify Real Image
1. Upload a real photo of a person
2. Expected: Should show "AUTHENTIC" or "INCONCLUSIVE" with high confidence

### Test Image 2: Verify Error Handling
1. Try uploading a text file (.txt) or unsupported format
2. Expected: Error notification appears

### Test Image 3: Verify UI Responsiveness
1. Upload image
2. While analyzing, drag-and-drop another file
3. Expected: Second upload is ignored until first completes

## API Testing (Optional)

### Manual API Test with curl
```powershell
# Open new PowerShell and run:
$file = "path/to/test_image.jpg"
curl -X POST -F "image=@$file" http://localhost:5000/api/predict

# Expected response:
# {
#   "verdict": "DEEPFAKE DETECTED" or "AUTHENTIC",
#   "prediction": "FAKE" or "REAL" or "UNCERTAIN",
#   "confidence": 85.5,
#   "isFake": true/false,
#   "filename": "test_image.jpg"
# }
```

### Manual API Test with Python
```python
import requests

with open('path/to/test_image.jpg', 'rb') as f:
    files = {'image': f}
    response = requests.post('http://localhost:5000/api/predict', files=files)
    print(response.json())
```

## Browser Console Check

After uploading an image, open browser DevTools (F12) and check:

1. **Network Tab**: 
   - Should see POST request to `http://localhost:5000/api/predict`
   - Response status should be 200 OK

2. **Console Tab**:
   - Should NOT see CORS errors
   - Should NOT see 404 errors
   - Errors would appear as red messages

3. **Application Tab**:
   - Check localStorage for any cached results

## Troubleshooting

### "Cannot POST /api/predict"
- ❌ Backend not running or wrong port
- ✅ Check backend is running on `http://localhost:5000`

### CORS Error in Console
- ❌ Backend CORS not configured properly
- ✅ Verify `flask_cors` is installed: `pip list | grep flask-cors`
- ✅ Verify `CORS(app, resources=...)` in `backend/app.py`

### "File request.files["image"] not found"
- ❌ Frontend not sending file in multipart/form-data
- ✅ Check `formData.append('image', file)` in `App.tsx`

### Model Load Error
- ❌ Model file missing or corrupted
- ✅ Check `backend/model/deepfake_model.keras` exists
- ✅ If missing, place model file or rebuild

### Prediction Takes Too Long
- ❌ System is slow or model is loading first time
- ✅ First prediction takes 10-30 seconds (model loading)
- ✅ Subsequent predictions are faster (model cached)
- ✅ Check system resources (RAM: 4GB+, GPU preferred)

## File Locations for Reference

```
D:\python\DeepFake-Detection-System-Draft-4\
├── backend/
│   ├── app.py                    [MODIFIED] ← Flask server with API endpoint
│   ├── model/
│   │   ├── predict.py           [PRESERVED] ← Prediction logic (thresholds unchanged)
│   │   ├── deepfake_model.keras [UNTOUCHED] ← Model weights
│   │   └── deepfake_model.h5    [UNTOUCHED] ← Model weights (backup)
│   └── utils/
│       └── preprocess.py         [PRESERVED] ← Image preprocessing
├── frontend/
│   ├── src/
│   │   ├── App.tsx              [MODIFIED] ← Handles API calls, no more mock data
│   │   └── components/
│   │       └── ResultsSection.tsx [MODIFIED] ← Handles real API response
│   └── package.json
├── requirements.txt              [MODIFIED] ← Added flask-cors
└── FRONTEND_BACKEND_INTEGRATION.md [NEW] ← Integration documentation
```

## Key Integration Points

| Component | URL | Method | Purpose |
|-----------|-----|--------|---------|
| Frontend | `http://localhost:5173` | - | React dev server |
| Backend | `http://localhost:5000` | - | Flask API server |
| API Endpoint | `/api/predict` | POST | Upload image, get prediction |

## Model Accuracy Guaranteed

✅ **Preserved**:
- Thresholds: LOW=0.45, HIGH=0.65
- Confidence calculations
- Image preprocessing (299x299 + Xception normalization)
- Model weights and architecture
- Prediction logic

✅ **No Changes**:
- `backend/model/predict.py`
- `backend/model/deepfake_model.h5/.keras`
- `backend/utils/preprocess.py`

## After Integration Works

You can now:
1. ✅ Upload images from frontend
2. ✅ Get real model predictions
3. ✅ Display results with actual confidence scores
4. ✅ Handle errors gracefully
5. ✅ Use all UI features with real data

Happy detecting! 🚀
