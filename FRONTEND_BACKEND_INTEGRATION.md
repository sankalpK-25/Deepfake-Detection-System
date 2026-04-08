# Frontend Backend Integration

## Current integration model

The project now behaves as a single web application when run through Flask:

- React is built into `frontend/build`
- Flask serves the built files
- The frontend calls the backend using the same origin at `/api/predict`

This is the integration path that matches the current codebase.

## Frontend flow

`frontend/src/App.tsx`:

- creates a preview with `FileReader`
- sends the uploaded file as `FormData`
- calls `fetch('/api/predict')`
- stores `verdict`, `prediction`, `confidence`, `isFake`, and `filename`
- shows an error banner if the request fails

`frontend/src/components/UploadSection.tsx`:

- accepts drag-and-drop and file input
- currently allows both image and video MIME types at the UI level

`frontend/src/components/ResultsSection.tsx`:

- renders the image preview
- shows the verdict and confidence ring
- shows filename
- hides the detailed metrics section unless real metric values are present

## Backend flow

`backend/app.py`:

- serves `frontend/build`
- accepts `POST /api/predict`
- validates the uploaded filename and extension
- writes uploads into a writable runtime directory
- maps raw classes to user-facing verdicts

Verdict mapping:

- `REAL` -> `AUTHENTIC`
- `FAKE` -> `DEEPFAKE DETECTED`
- `UNCERTAIN` -> `INCONCLUSIVE`

## Why the built frontend matters

The frontend currently uses a relative API path:

```ts
fetch('/api/predict', ...)
```

That means:

- Flask-served build: works
- standalone Vite dev server: needs a proxy or an absolute backend URL

`frontend/vite.config.ts` does not currently define a proxy, so the repository's end-to-end path is the Flask-served build.

## CORS

`backend/app.py` still includes CORS settings for common localhost frontend origins. That is useful if you later wire the Vite dev server to Flask with a proxy or switch the frontend request URL to an absolute backend address.

## Current integration caveats

### Video uploads

The UI and backend extension allow-list mention video, but the backend preprocessing path is image-based. Video analysis is not fully implemented yet.

### Detailed metrics

The frontend has space for detailed metrics, but the backend does not currently return those fields. The UI safely hides that section unless the values are populated.

## Recommended workflow

For current contributors:

1. Build the frontend with `npm run build`
2. Start Flask with `python main.py`
3. Test the app at `http://127.0.0.1:5000`

If you want live frontend development with API access, add a Vite proxy or change the frontend fetch URL.
