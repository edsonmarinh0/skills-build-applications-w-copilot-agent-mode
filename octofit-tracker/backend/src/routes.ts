import { Router } from 'express';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import Leaderboard from './models/leaderboard';
import Workout from './models/workout';

const router = Router();

const resourceHandlers: Array<{ path: string; model: any; name: string }> = [
  { path: '/users', model: User, name: 'users' },
  { path: '/teams', model: Team, name: 'teams' },
  { path: '/activities', model: Activity, name: 'activities' },
  { path: '/leaderboard', model: Leaderboard, name: 'leaderboard' },
  { path: '/workouts', model: Workout, name: 'workouts' },
];

for (const route of resourceHandlers) {
  router.get(route.path, async (_req, res) => {
    try {
      const records = await route.model.find({});
      res.json({ resource: route.name, data: records });
    } catch (error) {
      res.status(500).json({ error: `Failed to load ${route.name}` });
    }
  });

  router.post(route.path, async (req, res) => {
    try {
      const record = await route.model.create(req.body);
      res.status(201).json({ resource: route.name, data: record });
    } catch (error) {
      res.status(500).json({ error: `Failed to create ${route.name}` });
    }
  });
}

export default router;
