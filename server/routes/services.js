import { Router } from 'express';
import { listPublicServices } from '../repositories/contentRepository.js';

export function createServicesRouter(db) {
  const router = Router();
  router.get('/', (request, response) => response.json({ items: listPublicServices(db) }));
  return router;
}
