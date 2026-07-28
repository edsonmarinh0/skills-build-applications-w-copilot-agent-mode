"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const users = await user_1.default.insertMany([
            { name: 'Ava Patel', email: 'ava@example.com', role: 'coach', fitnessLevel: 'advanced' },
            { name: 'Noah Kim', email: 'noah@example.com', role: 'member', fitnessLevel: 'intermediate' },
            { name: 'Mia Chen', email: 'mia@example.com', role: 'member', fitnessLevel: 'beginner' },
        ]);
        const teams = await team_1.default.insertMany([
            {
                name: 'River Runners',
                sport: 'Running',
                members: [users[0]._id, users[1]._id],
                captain: users[0]._id,
            },
            {
                name: 'Peak Cyclists',
                sport: 'Cycling',
                members: [users[2]._id],
                captain: users[2]._id,
            },
        ]);
        await activity_1.default.insertMany([
            {
                user: users[1]._id,
                type: 'Run',
                durationMinutes: 45,
                distanceKm: 7.2,
                caloriesBurned: 520,
                notes: 'Morning tempo run',
            },
            {
                user: users[2]._id,
                type: 'Cycling',
                durationMinutes: 60,
                distanceKm: 18,
                caloriesBurned: 650,
                notes: 'Evening ride',
            },
        ]);
        await leaderboard_1.default.insertMany([
            { user: users[1]._id, score: 980, streak: 5, rank: 1 },
            { user: users[2]._id, score: 915, streak: 2, rank: 2 },
            { user: users[0]._id, score: 890, streak: 4, rank: 3 },
        ]);
        await workout_1.default.insertMany([
            {
                title: 'Core Strength Circuit',
                category: 'Strength',
                durationMinutes: 30,
                difficulty: 'moderate',
                focus: 'Abs and back',
            },
            {
                title: 'Hill Intervals',
                category: 'Cardio',
                durationMinutes: 25,
                difficulty: 'challenging',
                focus: 'Endurance',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
