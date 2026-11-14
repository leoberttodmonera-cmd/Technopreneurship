import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { hashPassword, verifyPassword } from '../security/passwords.js';
import { publicUser } from '../security/sessions.js';

function normalizeUser(row) {
  return row ? { id: row.id, email: row.email, displayName: row.display_name, role: row.role, departmentId: row.department_id } : null;
}
export function createAuthRouter(db, sessions) {
  const router = Router();
  router.get('/me', (request, response) => response.json({ user: publicUser(request.user) }));
  router.post('/register', (request, response) => {
    const displayName = String(request.body?.displayName || '').trim();
    const email = String(request.body?.email || '').trim().toLowerCase();
    const password = String(request.body?.password || '');
    if (displayName.length < 2 || displayName.length > 80) return response.status(400).json({ error: { code: 'INVALID_NAME', message: 'Enter a name between 2 and 80 characters.' } });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return response.status(400).json({ error: { code: 'INVALID_EMAIL', message: 'Enter a valid email address.' } });
    if (password.length < 10 || password.length > 128) return response.status(400).json({ error: { code: 'INVALID_PASSWORD', message: 'Password must be 10 to 128 characters.' } });
    const existing = db.prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE').get(email);
    if (existing) return response.status(409).json({ error: { code: 'EMAIL_EXISTS', message: 'An account already uses that email.' } });
    const user = { id: randomUUID(), email, displayName, role: 'student', departmentId: null };
    db.prepare('INSERT INTO users (id,email,display_name,password_hash,role,department_id,created_at) VALUES (?,?,?,?,?,?,?)').run(user.id, email, displayName, hashPassword(password), user.role, null, new Date().toISOString());
    sessions.create(response, user);
    return response.status(201).json({ user: publicUser(user) });
  });
  router.post('/login', (request, response) => {
    const email = String(request.body?.email || '').trim().toLowerCase();
    const password = String(request.body?.password || '');
    const row = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE').get(email);
    if (!row || !verifyPassword(password, row.password_hash)) return response.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Email or password was not recognized.' } });
    const user = normalizeUser(row);
    sessions.create(response, user);
    return response.json({ user: publicUser(user) });
  });
  router.post('/logout', (request, response) => { sessions.destroy(request, response); response.json({ ok: true }); });
  return router;
}
