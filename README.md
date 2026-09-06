# DROP: Specialty Coffee App


`drop-frontend/`  React 19 + Redux Toolkit + MUI + Framer Motion (Vite)
`drop-backend/` — Node + Express + MongoDB + JWT + Socket.io (Socket.io wired but Orders currently polls every 30s, matching the reference app's "Live updates every 30s" pattern)

## Quick start

**Backend**
```bash
cd drop-backend

npm install
npm run seed            # seeds 16 coffees + a default admin (admin@dropcoffee.com / admin12345)
npm run dev
```

**Frontend**
```bash
cd drop-frontend

npm install
npm run dev
```

