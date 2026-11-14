export function requireUser(request, response, next) {
  if (!request.user) return response.status(401).json({ error: { code: 'AUTH_REQUIRED', message: 'Sign in to use this feature.' } });
  next();
}
export function requireRole(...roles) {
  return (request, response, next) => {
    if (!request.user) return response.status(401).json({ error: { code: 'AUTH_REQUIRED', message: 'Sign in to use this feature.' } });
    if (!roles.includes(request.user.role)) return response.status(403).json({ error: { code: 'FORBIDDEN', message: 'Your account does not have permission for this action.' } });
    next();
  };
}
