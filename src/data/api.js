async function request(path, options = {}) {
  const response = await fetch(path, { ...options, headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Request failed (${response.status}).`);
  return data;
}
const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });
export async function getServices() { return (await request('/api/services')).items; }
export async function getAnnouncements() { return (await request('/api/announcements')).items; }
export async function getMe() { return (await request('/api/auth/me')).user; }
export async function login(credentials) { return (await post('/api/auth/login', credentials)).user; }
export async function registerAccount(details) { return (await post('/api/auth/register', details)).user; }
export async function logout() { return request('/api/auth/logout', { method: 'POST' }); }
export async function getStudentFeed() { return (await request('/api/feed')).items; }
export async function getTickets() { return (await request('/api/tickets')).items; }
export async function getTicket(id) { return (await request(`/api/tickets/${encodeURIComponent(id)}`)).ticket; }
export async function createTicket(details) { return (await post('/api/tickets', details)).ticket; }
export async function replyToTicket(id, body) { return (await post(`/api/tickets/${encodeURIComponent(id)}/messages`, { body })).ticket; }
export async function setTicketStatus(id, status) { return (await request(`/api/tickets/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Content-Type': 'application/json' } })).ticket; }
export async function createAnnouncement(details) { return post('/api/staff/announcements', details); }
