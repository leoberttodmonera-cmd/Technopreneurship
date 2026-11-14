import express from 'express';
import { createServicesRouter } from './routes/services.js';
import { createAnnouncementsRouter } from './routes/announcements.js';
import { createHealthRouter } from './routes/health.js';

export function createApp({ db }) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));
  app.use('/api/health', createHealthRouter());
  app.use('/api/services', createServicesRouter(db));
  app.use('/api/announcements', createAnnouncementsRouter(db));
  app.use((request, response) => response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found.' } }));
  app.use((error, request, response, next) => {
    console.error('API request failed:', error.message);
    response.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'The local demo API could not complete the request.' } });
  });
  return app;
}
