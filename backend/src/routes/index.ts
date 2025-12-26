import { Express } from 'express';
import { userRoutes } from './userRoutes.js';
import { postRoutes } from './postRoutes.js';

export function registerRoutes(app: Express) {
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  userRoutes(app);
  postRoutes(app);
}