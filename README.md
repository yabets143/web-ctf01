# Parameter Pollution → EJS SSTI CTF

A trimmed CTF-ready build of the vulnerable lab. Goal: use parameter/prototype pollution to flip `user.isAdmin` then visit `/admin` to see the flag.

## How to run locally

```bash
# Windows PowerShell
cd "c:\Users\hp\Desktop\INSA summer camp\Rank\My-Vulnerable-site-CTF"
npm install
npm start
# Open http://localhost:3000
```

## Challenge Hint
- Update your profile via `POST /update-profile` with nested keys to pollute the global `user` object.
- Once `user.isAdmin` becomes true, open `/admin` to reveal:

```
CSEC{N0W_Y0U_KNOW_P4R4M373R_P0LU710N}
```

## Free Deploy Options

- Render: Free web service with Node support
  - Add `package.json` with `start` script (already present)
  - Set Build Command: `npm install`
  - Set Start Command: `npm start`

- Railway: Free tier (may require card for verification)
  - Quick deploy from repo or local folder

- Fly.io: Free small VM; need Dockerfile (optional)

- Koyeb: Free tier for Node apps

If you prefer Heroku (free dynos are gone), use Render/Railway/Koyeb which are currently free for small projects.

## Route Map
- GET `/` home
- GET/POST `/auth/register`, `/auth/login`, `/auth/logout`
- GET `/dashboard`
- POST `/update-profile` (pollution sink)
- GET `/admin` (SSTI + flag)
- GET/POST `/messages`
- GET/POST `/upload`
- GET `/search` (merge demo)
