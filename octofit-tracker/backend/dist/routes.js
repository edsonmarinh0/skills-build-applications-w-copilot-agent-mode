"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const leaderboard_1 = __importDefault(require("./models/leaderboard"));
const workout_1 = __importDefault(require("./models/workout"));
const router = (0, express_1.Router)();
const resourceHandlers = [
    { path: '/users', model: user_1.default, name: 'users' },
    { path: '/teams', model: team_1.default, name: 'teams' },
    { path: '/activities', model: activity_1.default, name: 'activities' },
    { path: '/leaderboard', model: leaderboard_1.default, name: 'leaderboard' },
    { path: '/workouts', model: workout_1.default, name: 'workouts' },
];
for (const route of resourceHandlers) {
    router.get(route.path, async (_req, res) => {
        try {
            const records = await route.model.find({});
            res.json({ resource: route.name, data: records });
        }
        catch (error) {
            res.status(500).json({ error: `Failed to load ${route.name}` });
        }
    });
    router.post(route.path, async (req, res) => {
        try {
            const record = await route.model.create(req.body);
            res.status(201).json({ resource: route.name, data: record });
        }
        catch (error) {
            res.status(500).json({ error: `Failed to create ${route.name}` });
        }
    });
}
exports.default = router;
