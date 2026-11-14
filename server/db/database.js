import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const defaultDatabasePath = resolve(projectRoot, 'server/data/mpc-safari-demo.sqlite');

export function openDatabase(databasePath = process.env.DATABASE_PATH || defaultDatabasePath) {
  if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
  const db = new Database(databasePath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS departments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      demo_only INTEGER NOT NULL DEFAULT 1 CHECK (demo_only = 1)
    );
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      department_id TEXT NOT NULL REFERENCES departments(id),
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      tone TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
      audience_scope TEXT NOT NULL DEFAULT 'public' CHECK (audience_scope IN ('public', 'signed_in')),
      demo_only INTEGER NOT NULL DEFAULT 1 CHECK (demo_only = 1)
    );
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      department_id TEXT NOT NULL REFERENCES departments(id),
      title TEXT NOT NULL,
      published_label TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
      audience_scope TEXT NOT NULL DEFAULT 'public' CHECK (audience_scope IN ('public', 'signed_in', 'department')),
      demo_only INTEGER NOT NULL DEFAULT 1 CHECK (demo_only = 1)
    );
  `);
  seedDatabase(db);
  return db;
}

function seedDatabase(db) {
  const count = db.prepare('SELECT COUNT(*) AS count FROM services').get().count;
  if (count > 0) return;

  const insertDepartment = db.prepare('INSERT INTO departments (id, name, category, location) VALUES (?, ?, ?, ?)');
  const insertService = db.prepare('INSERT INTO services (id, department_id, name, category, description, location, tone) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const insertAnnouncement = db.prepare('INSERT INTO announcements (id, department_id, title, published_label) VALUES (?, ?, ?, ?)');
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
      ['ann-welcome', 'registrar', 'Welcome to the MPC SAFARI design preview', 'Fictional demo announcement'],
      ['ann-demo', 'guidance', 'This preview uses fictional service examples', 'Project note · Demo content'],
    ].forEach((row) => insertAnnouncement.run(...row));
  });
  seed();
}
