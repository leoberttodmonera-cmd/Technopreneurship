export function listPublicServices(db) {
  return db.prepare(`
    SELECT id, name, category, description, location, tone
    FROM services
    WHERE status = 'published' AND audience_scope = 'public' AND demo_only = 1
    ORDER BY name COLLATE NOCASE
  `).all();
}

export function listPublicAnnouncements(db) {
  return db.prepare(`
    SELECT announcements.id, announcements.title, announcements.published_label,
           departments.name AS department_name
    FROM announcements
    JOIN departments ON departments.id = announcements.department_id
    WHERE announcements.status = 'published'
      AND announcements.audience_scope = 'public'
      AND announcements.demo_only = 1
    ORDER BY announcements.id
  `).all();
}
