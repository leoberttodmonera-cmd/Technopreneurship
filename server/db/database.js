import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashPassword } from '../security/passwords.js';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const defaultDatabasePath = resolve(projectRoot, 'server/data/mpc-safari-demo.sqlite');

export function openDatabase(databasePath = process.env.DATABASE_PATH || defaultDatabasePath) {
  if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
  const db = new Database(databasePath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS departments (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL,
      location TEXT NOT NULL, demo_only INTEGER NOT NULL DEFAULT 1 CHECK (demo_only = 1)
    );
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY, department_id TEXT NOT NULL REFERENCES departments(id),
      name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL,
      location TEXT NOT NULL, tone TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
      audience_scope TEXT NOT NULL DEFAULT 'public' CHECK (audience_scope IN ('public', 'signed_in')),
      demo_only INTEGER NOT NULL DEFAULT 1 CHECK (demo_only = 1)
    );
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY, department_id TEXT NOT NULL REFERENCES departments(id),
      title TEXT NOT NULL, body TEXT NOT NULL DEFAULT '', published_label TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
      audience_scope TEXT NOT NULL DEFAULT 'public' CHECK (audience_scope IN ('public', 'signed_in', 'department')),
      demo_only INTEGER NOT NULL DEFAULT 1 CHECK (demo_only = 1)
    );
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      display_name TEXT NOT NULL, password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student', 'staff')),
      department_id TEXT REFERENCES departments(id), created_at TEXT NOT NULL,
      CHECK ((role = 'student' AND department_id IS NULL) OR (role = 'staff' AND department_id IS NOT NULL))
    );
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY, student_id TEXT NOT NULL REFERENCES users(id),
      department_id TEXT NOT NULL REFERENCES departments(id), service_id TEXT NOT NULL REFERENCES services(id),
      subject TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ticket_messages (
      id TEXT PRIMARY KEY, ticket_id TEXT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      author_id TEXT NOT NULL REFERENCES users(id), body TEXT NOT NULL, created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tickets_student ON tickets(student_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_tickets_department ON tickets(department_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_messages_ticket ON ticket_messages(ticket_id, created_at);
  `);
  migrate(db);
  seedDatabase(db);
  return db;
}

function migrate(db) {
  const columns = db.prepare('PRAGMA table_info(announcements)').all().map((column) => column.name);
  if (!columns.includes('body')) db.exec("ALTER TABLE announcements ADD COLUMN body TEXT NOT NULL DEFAULT ''");
}

function seedDatabase(db) {
  const insertDepartment = db.prepare('INSERT OR IGNORE INTO departments (id, name, category, location) VALUES (?, ?, ?, ?)');
  const insertService = db.prepare('INSERT OR IGNORE INTO services (id, department_id, name, category, description, location, tone) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const insertAnnouncement = db.prepare('INSERT OR IGNORE INTO announcements (id, department_id, title, body, published_label, audience_scope) VALUES (?, ?, ?, ?, ?, ?)');
  const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, email, display_name, password_hash, role, department_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const seed = db.transaction(() => {
    [
      ['registrar', 'Registrar', 'Academic services', 'Example location — verify with office'],
      ['cashier', 'Cashier', 'Payments', 'Example location — verify with office'],
      ['guidance', 'Guidance Office', 'Student support', 'Example location — verify with office'],
      ['irgo', 'IRGO', 'Uniform services', 'Example location — verify with office'],
      ['clinic', 'Campus Clinic', 'Health services', 'Example location — verify with office'],
      ['wayfinding', 'Campus Locations', 'Wayfinding', 'Example campus map placeholder'],
    ].forEach((row) => insertDepartment.run(...row));
    [
      ['svc-registrar', 'registrar', 'Registrar', 'Academic services', 'Example category for enrollment and records information.', 'Example location — verify with office', 'blue'],
      ['svc-cashier', 'cashier', 'Cashier', 'Payments', 'Example category for payment office information.', 'Example location — verify with office', 'violet'],
      ['svc-guidance', 'guidance', 'Guidance Office', 'Student support', 'Example category for learning how to contact student support.', 'Example location — verify with office', 'green'],
      ['svc-irgo', 'irgo', 'IRGO', 'Uniform services', 'Example category for uniform service information.', 'Example location — verify with office', 'orange'],
      ['svc-clinic', 'clinic', 'Campus Clinic', 'Health services', 'Example category for general clinic access information.', 'Example location — verify with office', 'pink'],
      ['svc-wayfinding', 'wayfinding', 'Campus Locations', 'Wayfinding', 'Example category for campus building and office locations.', 'Example campus map placeholder', 'cyan'],
    ].forEach((row) => insertService.run(...row));
    [
      ['ann-welcome', 'registrar', 'Welcome to the MPC SAFARI design preview', 'This is fictional content created for testing the local campus information hub.', 'Fictional demo announcement', 'public'],
      ['ann-demo', 'guidance', 'This preview uses fictional service examples', 'Do not treat any example entry as verified campus information.', 'Project note · Demo content', 'public'],
      ['ann-student', 'registrar', 'Student-feed example', 'This sample is only visible to signed-in demo accounts.', 'Student feed · Demo content', 'signed_in'],
    ].forEach((row) => insertAnnouncement.run(...row));
    const now = new Date().toISOString();
    insertUser.run('demo-student', 'student@example.test', 'Demo Student', hashPassword('StudentDemo123!'), 'student', null, now);
    insertUser.run('demo-registrar-staff', 'staff@example.test', 'Demo Office Staff', hashPassword('StaffDemo123!'), 'staff', 'registrar', now);
  });
  seed();
}
