const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// IN-MEMORY GAME STATE
// ============================================
let gameState = {
  teams: {},          // { captainName: { members: [], answers: {}, submittedAt: {} } }
  unlockedQuestions: [], // [1, 2, 3, ...] — unlocked question IDs
  gameStarted: false,
  gameEnded: false
};

// ============================================
// GOOGLE SHEETS LOGGING
// ============================================
async function logToSheet(data) {
  try {
    await fetch(config.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error('Sheet log error:', err.message);
  }
}

// ============================================
// PLAYER ROUTES
// ============================================

// Get game config (questions structure, no answers)
app.get('/api/config', (req, res) => {
  const safeQuestions = config.QUESTIONS.map(q => ({
    id: q.id,
    category: q.category,
    label: q.label,
    type: q.type,
    options: q.options || null,
    hint: q.hint || null,
    placeholder: q.placeholder || null,
    timer: config.QUESTION_TIMER
  }));
  res.json({
    questions: safeQuestions,
    timer: config.QUESTION_TIMER
  });
});

// Get current game state for a team
app.get('/api/state', (req, res) => {
  const { team } = req.query;
  const teamData = team ? gameState.teams[team] : null;
  res.json({
    gameStarted: gameState.gameStarted,
    gameEnded: gameState.gameEnded,
    unlockedQuestions: gameState.unlockedQuestions,
    submittedQuestions: teamData ? Object.keys(teamData.answers).map(Number) : []
  });
});

// Register a team
app.post('/api/register', async (req, res) => {
  const { captain, members } = req.body;

  if (!captain || captain.trim() === '') {
    return res.status(400).json({ error: 'Captain name is required' });
  }

  const captainKey = captain.trim().toLowerCase();

  if (gameState.teams[captainKey]) {
    // Allow re-registration (rejoin)
    return res.json({ success: true, team: captainKey, rejoined: true });
  }

  gameState.teams[captainKey] = {
    captain: captain.trim(),
    members: members || [],
    answers: {},
    submittedAt: {},
    registeredAt: new Date().toISOString()
  };

  await logToSheet({
    type: 'registration',
    table: captain.trim(),
    question: 'REGISTRATION',
    answer: `Members: ${(members || []).join(', ')}`,
    timestamp: new Date().toLocaleString()
  });

  res.json({ success: true, team: captainKey });
});

// Submit an answer
app.post('/api/answer', async (req, res) => {
  const { team, questionId, answer } = req.body;

  if (!gameState.teams[team]) {
    return res.status(404).json({ error: 'Team not found' });
  }

  if (!gameState.unlockedQuestions.includes(questionId)) {
    return res.status(403).json({ error: 'Question not unlocked' });
  }

  if (gameState.teams[team].answers[questionId] !== undefined) {
    return res.status(403).json({ error: 'Already answered' });
  }

  // Auto-mark if possible
  const qConfig = config.QUESTIONS.find(q => q.id === questionId);
  let autoScore = null;

  if (qConfig && qConfig.autoMark) {
    if (qConfig.type === 'mcq' || qConfig.type === 'number' || qConfig.type === 'short') {
      autoScore = answer.toString().trim().toLowerCase() === qConfig.correct.toString().toLowerCase() ? 1 : 0;
    } else if (qConfig.type === 'checkbox') {
      const selected = Array.isArray(answer) ? answer : [answer];
      const correct = qConfig.correct;
      const points = selected.filter(a => correct.includes(a)).length;
      autoScore = Math.min(points, 2); // Max 2 points for battles question
    }
  }

  gameState.teams[team].answers[questionId] = answer;
  gameState.teams[team].submittedAt[questionId] = new Date().toISOString();
  if (autoScore !== null) {
    if (!gameState.teams[team].scores) gameState.teams[team].scores = {};
    gameState.teams[team].scores[questionId] = autoScore;
  }

  const teamData = gameState.teams[team];
  await logToSheet({
    type: 'answer',
    table: teamData.captain,
    question: `Q${questionId} — ${qConfig ? qConfig.label : ''}`,
    answer: Array.isArray(answer) ? answer.join(', ') : answer,
    autoScore: autoScore !== null ? autoScore : 'manual',
    timestamp: new Date().toLocaleString()
  });

  res.json({ success: true, autoScore });
});

// ============================================
// ADMIN ROUTES
// ============================================

function adminAuth(req, res, next) {
  const { password } = req.headers;
  if (password !== config.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Get full game state for admin
app.get('/api/admin/state', adminAuth, (req, res) => {
  const summary = Object.entries(gameState.teams).map(([key, t]) => ({
    captain: t.captain,
    members: t.members,
    answeredCount: Object.keys(t.answers).length,
    answers: t.answers,
    scores: t.scores || {},
    submittedAt: t.submittedAt
  }));

  res.json({
    gameStarted: gameState.gameStarted,
    gameEnded: gameState.gameEnded,
    unlockedQuestions: gameState.unlockedQuestions,
    totalTeams: Object.keys(gameState.teams).length,
    teams: summary,
    timer: config.QUESTION_TIMER
  });
});

// Start game
app.post('/api/admin/start', adminAuth, (req, res) => {
  gameState.gameStarted = true;
  res.json({ success: true });
});

// Unlock a question
app.post('/api/admin/unlock', adminAuth, (req, res) => {
  const { questionId } = req.body;
  if (!gameState.unlockedQuestions.includes(questionId)) {
    gameState.unlockedQuestions.push(questionId);
  }
  res.json({ success: true, unlockedQuestions: gameState.unlockedQuestions });
});

// Lock a question back (in case of mistake)
app.post('/api/admin/lock', adminAuth, (req, res) => {
  const { questionId } = req.body;
  gameState.unlockedQuestions = gameState.unlockedQuestions.filter(q => q !== questionId);
  res.json({ success: true, unlockedQuestions: gameState.unlockedQuestions });
});

// Update score manually (for paragraph/short answers)
app.post('/api/admin/score', adminAuth, (req, res) => {
  const { team, questionId, score } = req.body;
  if (!gameState.teams[team]) return res.status(404).json({ error: 'Team not found' });
  if (!gameState.teams[team].scores) gameState.teams[team].scores = {};
  gameState.teams[team].scores[questionId] = score;
  res.json({ success: true });
});

// End game
app.post('/api/admin/end', adminAuth, (req, res) => {
  gameState.gameEnded = true;
  res.json({ success: true });
});

// Reset entire game
app.post('/api/admin/reset', adminAuth, (req, res) => {
  gameState = {
    teams: {},
    unlockedQuestions: [],
    gameStarted: false,
    gameEnded: false
  };
  res.json({ success: true });
});

// Get leaderboard
app.get('/api/admin/leaderboard', adminAuth, (req, res) => {
  const leaderboard = Object.entries(gameState.teams).map(([key, t]) => {
    const scores = t.scores || {};
    const total = Object.values(scores).reduce((a, b) => a + (b || 0), 0);
    return { captain: t.captain, total, scores, answeredCount: Object.keys(t.answers).length };
  }).sort((a, b) => b.total - a.total);

  res.json({ leaderboard });
});

// Update timer (admin can change mid-game)
app.post('/api/admin/timer', adminAuth, (req, res) => {
  const { seconds } = req.body;
  if (seconds > 0) config.QUESTION_TIMER = seconds;
  res.json({ success: true, timer: config.QUESTION_TIMER });
});

// ============================================
// SERVE FRONTEND
// ============================================
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Eid Trivia server running on port ${PORT}`));
