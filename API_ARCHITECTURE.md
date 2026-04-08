# API Architecture

## Runtime overview

The application has two runtime layers:

- Flask backend in `backend/app.py`
- React frontend built into `frontend/build`

In the repository's current working flow, Flask serves both:

- `GET /` -> built frontend
- `POST /api/predict` -> inference API

## Backend routes

### `GET /`

Serves `frontend/build/index.html`.

### `GET /<path:path>`

Behavior:

- If the request is for an asset that exists in `frontend/build`, Flask serves it
- If the request starts with `api/`, Flask returns a 404 JSON response
- Otherwise Flask falls back to `index.html` for frontend routing

### `POST /api/predict`

Accepts multipart form data with a file field named `image`.

## Request contract

### Form field

- `image`: uploaded file

### Current extension allow-list

Defined in `backend/app.py`:

- `png`
- `jpg`
- `jpeg`
- `gif`
- `bmp`
- `mp4`
- `avi`
- `mov`

Important:

- The current preprocessing pipeline in `backend/utils/preprocess.py` is image-only
- Treat image uploads as the supported production path

## Success response

```json
{
  "verdict": "DEEPFAKE DETECTED",
  "prediction": "FAKE",
  "confidence": 87.45,
  "isFake": true,
  "filename": "test.jpg"
}
```

## Response fields

| Field | Type | Meaning |
| --- | --- | --- |
| `verdict` | string | User-facing label: `AUTHENTIC`, `DEEPFAKE DETECTED`, or `INCONCLUSIVE` |
| `prediction` | string | Raw model class: `REAL`, `FAKE`, or `UNCERTAIN` |
| `confidence` | number | Confidence percentage |
| `isFake` | boolean | `true` when `prediction == "FAKE"` |
| `filename` | string | Sanitized uploaded filename |

## Error responses

Examples:

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

## Status codes

- `200` prediction completed
- `400` request validation failed
- `500` inference or server failure

## Inference flow

```text
User uploads file
  -> Flask validates extension
  -> Flask saves the file into writable runtime storage
  -> backend.model.predict.predict_image(filepath)
  -> backend.utils.preprocess.preprocess_image(filepath)
  -> TensorFlow model inference
  -> threshold mapping
  -> JSON response
```

## Thresholds

Defined in `backend/model/predict.py`:

- `LOW = 0.45`
- `HIGH = 0.65`

Logic:

- `p >= HIGH` -> `REAL`
- `p <= LOW` -> `FAKE`
- else -> `UNCERTAIN`

## Path handling

`backend/paths.py` separates:

- resource paths for packaged assets
- writable paths for runtime-generated files

This is why uploads are written via `writable_path("uploads")` and why the same code can work in a packaged PyInstaller build.

## Frontend/API relationship

The frontend currently posts to:

```ts
fetch('/api/predict', { method: 'POST', body: formData })
```

That works correctly when Flask serves the built frontend. It does not automatically work with the standalone Vite dev server because no proxy is configured in `frontend/vite.config.ts`.
