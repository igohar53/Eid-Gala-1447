# Eid Trivia Night 2025 🌙

A live multiplayer trivia game for your Eid gathering.

## How to deploy (free, ~5 mins)

### Step 1 — GitHub
1. Go to github.com and create a free account
2. Click "New repository" → name it `eid-trivia` → set to Public → Create
3. Upload ALL files from this folder (drag and drop works)
4. Commit the files

### Step 2 — Render
1. Go to render.com and create a free account (sign in with GitHub)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo `eid-trivia`
4. Settings:
   - Name: eid-trivia
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Click "Create Web Service"
6. Wait ~2 mins for deployment
7. Your URL: `https://eid-trivia.onrender.com`

## URLs
- **Player app:** `https://eid-trivia.onrender.com`
- **Admin panel:** `https://eid-trivia.onrender.com/admin`

## Admin password
`nyama2026`

## Editing the game
- Change timer, questions, password: edit `config.js`
- Re-deploy by pushing to GitHub (Render auto-deploys)

## On the night
1. Open `/admin` on your phone/laptop 5 mins before start
2. Wait for teams to register
3. Click "Start Game"
4. Unlock questions one by one as you call them
5. Use the Marking tab to score open answers
6. Check Leaderboard tab for live scores
7. Click "End Game" when done — announce winners!
