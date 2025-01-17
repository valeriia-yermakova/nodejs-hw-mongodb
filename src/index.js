import { initMongoConnection } from './db/initMongoDB.js';
import { setupServer } from './server.js';

async function start() {
  try {
    await initMongoConnection();
    await setupServer();
  } catch (error) {
    console.error('Failed to start application:', error.message);
    process.exit(1);
  }
}

start();
