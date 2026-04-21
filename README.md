# Next.js + FastAPI Auth Starter

## Quick start

1. Copy environment files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.local.example frontend/.env.local`
2. Run:
   - `docker compose up --build`
3. Open:
   - Frontend: http://localhost:3000
   - Backend docs: http://localhost:8000/docs

## Notes

- This starter stores JWT in `localStorage` for simplicity.
- For production, prefer HttpOnly secure cookies + refresh tokens.
