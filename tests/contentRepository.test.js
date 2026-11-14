import test from 'node:test';
import assert from 'node:assert/strict';
import { openDatabase } from '../server/db/database.js';
import { listPublicAnnouncements, listPublicServices } from '../server/repositories/contentRepository.js';

test('demo database seeds six fictional public service records', () => {
  const db = openDatabase(':memory:');
  try {
    const services = listPublicServices(db);
    assert.equal(services.length, 6);
    assert.ok(services.every((service) => service.location.includes('verify with office') || service.location.includes('placeholder')));
  } finally {
    db.close();
  }
});

test('public content queries do not return drafts or signed-in-only records', () => {
  const db = openDatabase(':memory:');
  try {
    db.prepare(`INSERT INTO services (id, department_id, name, category, description, location, tone, status, audience_scope)
      VALUES ('private-test', 'registrar', 'Private test', 'Test', 'Hidden', 'N/A', 'blue', 'published', 'signed_in')`).run();
    db.prepare(`INSERT INTO services (id, department_id, name, category, description, location, tone, status, audience_scope)
      VALUES ('draft-test', 'registrar', 'Draft test', 'Test', 'Hidden', 'N/A', 'blue', 'draft', 'public')`).run();
    assert.equal(listPublicServices(db).length, 6);
    assert.equal(listPublicAnnouncements(db).length, 2);
  } finally {
    db.close();
  }
});
