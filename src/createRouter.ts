import express from 'express';
import { AuthAdapter } from './types';
import { createAuthService } from './core/authService';

export const createAuthRouter = (adapter: AuthAdapter) => {
  const router = express.Router();
  const service = createAuthService(adapter);

  router.post('/register', async (req, res) => {
    try {
      const result = await service.register(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const result = await service.login(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/refresh', async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const result = await service.refreshToken(refreshToken);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  });
  
  return router;
};
