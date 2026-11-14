import test from 'node:test';
import assert from 'node:assert/strict';
import { openDatabase } from '../server/db/database.js';
import { createApp } from '../server/app.js';
import { hashPassword } from '../server/security/passwords.js';

async function fixture(run) {
  const db = openDatabase(':memory:');
  const otherStaffId = 'demo-cashier-staff';
  db.prepare('INSERT INTO users (id,email,display_name,password_hash,role,department_id,created_at) VALUES (?,?,?,?,?,?,?)').run(otherStaffId,'cashier-staff@example.test','Cashier Demo Staff',hashPassword('CashierDemo123!'),'staff','cashier',new Date().toISOString());
  const server = createApp({ db }).listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  async function call(path, { method = 'GET', body, cookie } = {}) {
    const response = await fetch(`${base}${path}`, { method, headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const data = await response.json();
    const setCookie = response.headers.get('set-cookie');
    return { response, data, cookie: setCookie?.split(';')[0] || cookie };
  }
  try { await run({ call }); } finally { await new Promise((resolve) => server.close(resolve)); db.close(); }
}

test('anonymous visitors can read public content but not student feed or tickets', async () => fixture(async ({ call }) => {
  assert.equal((await call('/api/services')).data.items.length, 6);
  assert.equal((await call('/api/feed')).response.status, 401);
  assert.equal((await call('/api/tickets')).response.status, 401);
}));

test('student can register and session cookie is HttpOnly; weak password is rejected', async () => fixture(async ({ call }) => {
  const weak = await call('/api/auth/register', { method: 'POST', body: { displayName: 'Sample Student', email: 'new@example.test', password: 'short' } });
  assert.equal(weak.response.status, 400);
  const created = await call('/api/auth/register', { method: 'POST', body: { displayName: 'Sample Student', email: 'new@example.test', password: 'A-long-demo-pass-123' } });
  assert.equal(created.response.status, 201);
  assert.equal(created.data.user.role, 'student');
  assert.match(created.response.headers.get('set-cookie'), /HttpOnly/);
  assert.equal((await call('/api/auth/me', { cookie: created.cookie })).data.user.email, 'new@example.test');
}));

test('student ticket is visible to its owner and assigned department only; staff reply/status works', async () => fixture(async ({ call }) => {
  const student = await call('/api/auth/login', { method: 'POST', body: { email: 'student@example.test', password: 'StudentDemo123!' } });
  const staff = await call('/api/auth/login', { method: 'POST', body: { email: 'staff@example.test', password: 'StaffDemo123!' } });
  const otherStaff = await call('/api/auth/login', { method: 'POST', body: { email: 'cashier-staff@example.test', password: 'CashierDemo123!' } });
  const second = await call('/api/auth/register', { method: 'POST', body: { displayName: 'Other Student', email: 'other@example.test', password: 'Other-demo-pass-321' } });
  const created = await call('/api/tickets', { method: 'POST', cookie: student.cookie, body: { serviceId: 'svc-registrar', subject: 'Demo records question', message: 'This is fictional test content only.' } });
  assert.equal(created.response.status, 201);
  const id = created.data.ticket.id;
  assert.equal((await call(`/api/tickets/${id}`, { cookie: second.cookie })).response.status, 404);
  assert.equal((await call(`/api/tickets/${id}`, { cookie: staff.cookie })).response.status, 200);
  assert.equal((await call(`/api/tickets/${id}`, { cookie: otherStaff.cookie })).response.status, 404);
  assert.equal((await call('/api/tickets', { cookie: otherStaff.cookie })).data.items.length, 0);
  const staffList = await call('/api/tickets', { cookie: staff.cookie });
  assert.equal(staffList.data.items.length, 1);
  assert.equal(staffList.data.items[0].studentName, 'Demo Student');
  assert.equal((await call(`/api/tickets/${id}/messages`, { method: 'POST', cookie: staff.cookie, body: { body: 'Demo office reply.' } })).response.status, 201);
  assert.equal((await call(`/api/tickets/${id}/status`, { method: 'PATCH', cookie: staff.cookie, body: { status: 'in_progress' } })).data.ticket.status, 'in_progress');
  const ownerView = await call(`/api/tickets/${id}`, { cookie: student.cookie });
  assert.equal(ownerView.data.ticket.messages.length, 2);
}));

test('only staff may publish; signed-in feed includes student audience posts, public endpoint excludes them', async () => fixture(async ({ call }) => {
  const student = await call('/api/auth/login', { method: 'POST', body: { email: 'student@example.test', password: 'StudentDemo123!' } });
  const staff = await call('/api/auth/login', { method: 'POST', body: { email: 'staff@example.test', password: 'StaffDemo123!' } });
  const payload = { title: 'Fictional staff announcement', body: 'This is a made-up announcement for testing.', audienceScope: 'signed_in' };
  assert.equal((await call('/api/staff/announcements', { method: 'POST', cookie: student.cookie, body: payload })).response.status, 403);
  assert.equal((await call('/api/staff/announcements', { method: 'POST', cookie: staff.cookie, body: payload })).response.status, 201);
  const publicTitles = (await call('/api/announcements')).data.items.map((item) => item.title);
  assert.ok(!publicTitles.includes(payload.title));
  const feedTitles = (await call('/api/feed', { cookie: student.cookie })).data.items.map((item) => item.title);
  assert.ok(feedTitles.includes(payload.title));
}));
