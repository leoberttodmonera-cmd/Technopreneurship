import express from 'express';
import { createServicesRouter } from './routes/services.js';
import { createAnnouncementsRouter } from './routes/announcements.js';
import { createHealthRouter } from './routes/health.js';
import { createAuthRouter } from './routes/auth.js';
import { createSessionManager } from './security/sessions.js';
import { createFeedRouter, createStaffRouter, createTicketsRouter } from './routes/workflows.js';

export function createApp({ db, sessions = createSessionManager() }) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));
  app.use(sessions.middleware);
  app.use('/api/health', createHealthRouter());
  app.use('/api/auth', createAuthRouter(db, sessions));
  app.use('/api/services', createServicesRouter(db));
  app.use('/api/announcements', createAnnouncementsRouter(db));
  app.use('/api/feed', createFeedRouter(db));
  app.use('/api/tickets', createTicketsRouter(db));
  app.use('/api/staff', createStaffRouter(db));
  app.use((request, response) => response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found.' } }));
  app.use((error, request, response, next) => {
    console.error('API request failed:', error.message);
    response.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'The local demo API could not complete the request.' } });
  });
  return app;
}
