import { Router } from 'express';
import { listPublicAnnouncements } from '../repositories/contentRepository.js';

export function createAnnouncementsRouter(db) {
  const router = Router();
  router.get('/', (request, response) => response.json({ items: listPublicAnnouncements(db) }));
  return router;
}
