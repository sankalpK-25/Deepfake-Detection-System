# Frontend

This directory contains the React + TypeScript frontend for the DeepFake Detection System.

## Stack

- React
- TypeScript
- Vite
- `motion`
- `lucide-react`
- Radix UI primitives

## Commands

### Install dependencies

```powershell
npm install
```

### Start the Vite dev server

```powershell
npm run dev
```

### Build for the Flask app

```powershell
npm run build
```

The build output is written to `frontend/build`.

## Important integration note

The app currently uses:

```ts
fetch('/api/predict')
```

Because there is no Vite proxy configured in `vite.config.ts`, the built frontend served by Flask is the current end-to-end path for real prediction testing.

## Related files

- `src/App.tsx` - main page and API call
- `src/components/UploadSection.tsx` - file upload UI
- `src/components/ResultsSection.tsx` - prediction result UI
- `vite.config.ts` - build output and dev server config
