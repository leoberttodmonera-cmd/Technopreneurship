import { createApp } from './app.js';
import { openDatabase } from './db/database.js';

const db = openDatabase();
const app = createApp({ db });
const port = Number(process.env.API_PORT || 3001);
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`MPC SAFARI local demo API: http://127.0.0.1:${port}/api/health`);
  console.log('Synthetic demo data only. This API is not production-ready.');
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
