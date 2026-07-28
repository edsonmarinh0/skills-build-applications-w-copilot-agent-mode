import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import routes from './routes';

dotenv.config();

export function createApp() {
  const app = express();
  const port = Number(process.env.PORT || 8000);
  const codespaceName = process.env.CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
  });

  app.use('/api', routes);

  return { app, port, baseUrl };
}

export function startServer() {
  const { app, port, baseUrl } = createApp();

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });

  return app;
}

if (require.main === module) {
  startServer();
}
