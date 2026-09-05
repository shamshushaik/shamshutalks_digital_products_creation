/**
 * contract-mock-demo-app — server.js
 * Demo Provider API for API Contract Testing and Mocking Starter Kit
 * Stack: Node.js 18+ + Express 4 + CORS
 * Run: npm install && npm start  → http://localhost:3000 (or PORT env)
 *
 * Endpoints (every endpoint referenced in Pact templates exists here):
 *   GET  /health              → 200 { status: "ok", version, timestamp }
 *   GET  /users/:id           → 200 { id, name, email, active, createdAt, tags } | 404
 *   POST /users               → 201 { id, name, email, active, createdAt, tags } | 422
 *   GET  /users?search=&page= → 200 { users: [...], total, page, pageSize }
 *
 * Seed: 5 users + edge cases, validation (404/422), reset on restart, port via env var
 * No database — in-memory array, CORS enabled for UI-against-mock workflow
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'Accept'] }));
app.use(express.json());

// ── Seed Data ───────────────────────────────────────────────────────────
// Loaded from data/users.json if present, else inline fallback
let users = [];
const dataPath = path.join(__dirname, 'data', 'users.json');
try {
  if (fs.existsSync(dataPath)) {
    users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } else {
    throw new Error('no file');
  }
} catch {
  users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true, createdAt: '2024-01-15T10:30:00.000Z', tags: ['admin', 'qa'] },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', active: true, createdAt: '2024-02-20T14:00:00.000Z', tags: ['developer'] },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', active: false, createdAt: '2024-03-10T09:15:00.000Z', tags: ['viewer'] },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', active: true, createdAt: '2024-04-05T11:45:00.000Z', tags: ['admin', 'developer'] },
    { id: 5, name: 'Evan Stone', email: 'evan@example.com', active: true, createdAt: '2024-05-12T08:00:00.000Z', tags: ['qa'] },
  ];
}
let nextId = Math.max(...users.map(u => u.id), 0) + 1;

// ── Helpers ─────────────────────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}

// ── Routes ──────────────────────────────────────────────────────────────

// Health — used by Postman collection + provider verification pre-check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() });
});

// Search — GET /users?search=&page=&pageSize=
// Must be BEFORE /users/:id so query route is not captured as :id
app.get('/users', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;

  let filtered = users;
  if (search) {
    filtered = users.filter(u => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search));
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  res.status(200).json({ users: paged, total, page, pageSize });
});

// Get by ID — GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found', message: `No user with id ${req.params.id}`, statusCode: 404 });
  }
  res.status(200).json(user);
});

// Create — POST /users
app.post('/users', (req, res) => {
  const { name, email, tags, active } = req.body;

  // Validation — 422 for missing/invalid fields
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'name is required and must be a non-empty string' });
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    errors.push({ field: 'email', message: 'email is required and must be a valid email address' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors, message: 'Validation failed', statusCode: 422 });
  }

  const newUser = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
    active: typeof active === 'boolean' ? active : true,
    createdAt: new Date().toISOString(),
    tags: Array.isArray(tags) ? tags : ['viewer'],
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', message: `Route ${req.method} ${req.path} not found`, statusCode: 404 });
});

// ── Start ───────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[contract-mock-demo-app] Server running at http://localhost:${PORT}`);
    console.log(`  GET  http://localhost:${PORT}/health`);
    console.log(`  GET  http://localhost:${PORT}/users/:id`);
    console.log(`  POST http://localhost:${PORT}/users`);
    console.log(`  GET  http://localhost:${PORT}/users?search=&page=`);
  });
}

module.exports = app;
