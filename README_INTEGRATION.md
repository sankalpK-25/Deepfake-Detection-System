# Integration README

This repository already contains the integrated frontend, backend, and packaging setup. The main thing to know is which run mode matches the current code.

## Current working path

Use:

1. `npm run build` inside `frontend/`
2. `python main.py`

Then open `http://127.0.0.1:5000`.

That path works because:

- Flask serves `frontend/build`
- the frontend calls `/api/predict`
- the API route lives in the same Flask app

## Development caveat

The standalone Vite dev server is not fully integrated with Flask yet because the frontend uses a relative fetch path and there is no proxy in `frontend/vite.config.ts`.

## Important files

- `README.md` - project overview
- `QUICK_START.md` - fastest working setup
- `API_ARCHITECTURE.md` - endpoint and runtime behavior
- `FRONTEND_BACKEND_INTEGRATION.md` - request flow and UI/backend mapping
- `INTEGRATION_GUIDE.md` - development and packaging notes
- `INTEGRATION_STATUS.md` - verification checklist
- `COMPLETE_CHECKLIST.md` - contributor/release checklist
- `DEBUG_LOG.md` - active debugging notes
