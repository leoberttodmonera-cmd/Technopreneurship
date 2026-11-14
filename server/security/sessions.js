import { randomBytes } from 'node:crypto';
const COOKIE = 'mpc_safari_demo_session';
const MAX_AGE_SECONDS = 60 * 60 * 8;
export function createSessionManager() {
  const sessions = new Map();
  function cookie(token, maxAge = MAX_AGE_SECONDS) {
    return `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
  }
  function readToken(header = '') {
    const entry = header.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`));
    return entry ? entry.slice(COOKIE.length + 1) : '';
  }
  return {
    middleware(request, response, next) {
      const token = readToken(request.headers.cookie || '');
      const session = sessions.get(token);
      if (session && session.expiresAt > Date.now()) {
        session.expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
        request.user = session.user;
      } else if (session) sessions.delete(token);
      next();
    },
    create(response, user) {
      const token = randomBytes(32).toString('base64url');
      sessions.set(token, { user, expiresAt: Date.now() + MAX_AGE_SECONDS * 1000 });
      response.setHeader('Set-Cookie', cookie(token));
    },
    destroy(request, response) {
      const token = readToken(request.headers.cookie || '');
      sessions.delete(token);
      response.setHeader('Set-Cookie', cookie('', 0));
    },
  };
}
export function publicUser(user) {
  if (!user) return null;
  return { id: user.id, email: user.email, displayName: user.displayName, role: user.role, departmentId: user.departmentId || null };
}
