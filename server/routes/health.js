import { Router } from 'express';

export function createHealthRouter() {
  const router = Router();
  router.get('/', (request, response) => response.json({ status: 'ok', mode: 'local-demo-only' }));
  return router;
}
