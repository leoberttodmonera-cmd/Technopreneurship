export function listPublicServices(db) {
  return db.prepare(`
    SELECT services.id, services.name, services.category, services.description,
           services.location, services.tone, services.department_id AS departmentId,
           departments.name AS departmentName
    FROM services JOIN departments ON departments.id = services.department_id
    WHERE services.status = 'published' AND services.audience_scope = 'public' AND services.demo_only = 1
    ORDER BY services.name COLLATE NOCASE
  `).all();
}

export function listPublicAnnouncements(db) {
  return db.prepare(`
    SELECT announcements.id, announcements.title, announcements.body,
           announcements.published_label, announcements.audience_scope,
           departments.name AS department_name
    FROM announcements
    JOIN departments ON departments.id = announcements.department_id
    WHERE announcements.status = 'published'
      AND announcements.audience_scope = 'public'
      AND announcements.demo_only = 1
    ORDER BY announcements.id
  `).all();
}
