import { randomUUID } from 'node:crypto';
const isoNow = () => new Date().toISOString();
function ticketSummary(row) { return { id: row.id, subject: row.subject, status: row.status, serviceName: row.service_name, departmentName: row.department_name, updatedAt: row.updated_at, studentName: row.student_name || undefined, studentEmail: row.student_email || undefined }; }
export function listStudentFeed(db) {
  return db.prepare(`SELECT announcements.id, announcements.title, announcements.body, announcements.published_label, announcements.audience_scope, departments.name AS department_name FROM announcements JOIN departments ON departments.id=announcements.department_id WHERE announcements.status='published' AND announcements.demo_only=1 AND announcements.audience_scope IN ('public','signed_in') ORDER BY announcements.id`).all();
}
export function createTicket(db, user, { serviceId, subject, message }) {
  const service = db.prepare("SELECT id, department_id FROM services WHERE id=? AND status='published' AND demo_only=1").get(serviceId);
  if (!service) return null;
  const id = `T-${randomUUID().slice(0, 8).toUpperCase()}`;
  const now = isoNow();
  const tx = db.transaction(() => {
    db.prepare('INSERT INTO tickets (id,student_id,department_id,service_id,subject,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)').run(id,user.id,service.department_id,service.id,subject,'open',now,now);
    db.prepare('INSERT INTO ticket_messages (id,ticket_id,author_id,body,created_at) VALUES (?,?,?,?,?)').run(randomUUID(),id,user.id,message,now);
  });
  tx(); return id;
}
const listBase = `SELECT t.*, s.name AS service_name, d.name AS department_name, u.display_name AS student_name, u.email AS student_email FROM tickets t JOIN services s ON s.id=t.service_id JOIN departments d ON d.id=t.department_id JOIN users u ON u.id=t.student_id`;
export function listMyTickets(db, userId) { return db.prepare(`${listBase} WHERE t.student_id=? ORDER BY t.updated_at DESC`).all(userId).map(ticketSummary); }
export function listDepartmentTickets(db, departmentId) { return db.prepare(`${listBase} WHERE t.department_id=? ORDER BY t.updated_at DESC`).all(departmentId).map((row) => ({ ...ticketSummary(row), studentName: row.student_name, studentEmail: row.student_email })); }
export function getTicket(db, id) {
  const row = db.prepare(`${listBase} WHERE t.id=?`).get(id);
  if (!row) return null;
  const messages = db.prepare(`SELECT m.id,m.body,m.created_at,u.display_name AS author_name,u.role AS author_role FROM ticket_messages m JOIN users u ON u.id=m.author_id WHERE m.ticket_id=? ORDER BY m.created_at`).all(id).map((m) => ({ id: m.id, body: m.body, createdAt: m.created_at, authorName: m.author_name, authorRole: m.author_role }));
  return { ...ticketSummary(row), studentId: row.student_id, departmentId: row.department_id, messages };
}
export function canReadTicket(db, user, ticketId) {
  const ticket = db.prepare('SELECT student_id,department_id FROM tickets WHERE id=?').get(ticketId);
  return Boolean(ticket && (ticket.student_id === user.id || (user.role === 'staff' && ticket.department_id === user.departmentId)));
}
export function addTicketMessage(db, ticketId, userId, body) {
  const now = isoNow();
  db.prepare('INSERT INTO ticket_messages (id,ticket_id,author_id,body,created_at) VALUES (?,?,?,?,?)').run(randomUUID(),ticketId,userId,body,now);
  db.prepare('UPDATE tickets SET updated_at=? WHERE id=?').run(now,ticketId);
}
export function updateTicketStatus(db, ticketId, departmentId, status) {
  const result = db.prepare('UPDATE tickets SET status=?,updated_at=? WHERE id=? AND department_id=?').run(status,isoNow(),ticketId,departmentId);
  return result.changes > 0;
}
export function createAnnouncement(db, user, { title, body, audienceScope }) {
  const id = `ann-${randomUUID()}`;
  db.prepare('INSERT INTO announcements (id,department_id,title,body,published_label,status,audience_scope) VALUES (?,?,?,?,?,?,?)').run(id,user.departmentId,title,body,'Just now · Demo staff post','published',audienceScope);
  return id;
}
