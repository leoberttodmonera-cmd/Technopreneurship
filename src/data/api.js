async function readItems(path) {
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`The local service returned ${response.status}. Is the API server running?`);
  }
  const body = await response.json();
  return body.items;
}

export function getServices() {
  return readItems('/api/services');
}

export function getAnnouncements() {
  return readItems('/api/announcements');
}
