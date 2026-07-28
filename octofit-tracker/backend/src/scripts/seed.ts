import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava@example.com', role: 'coach', fitnessLevel: 'advanced' },
      { name: 'Noah Kim', email: 'noah@example.com', role: 'member', fitnessLevel: 'intermediate' },
      { name: 'Mia Chen', email: 'mia@example.com', role: 'member', fitnessLevel: 'beginner' },
    ]);

    const teams = await Team.insertMany([
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

    await Activity.insertMany([
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

    await Leaderboard.insertMany([
      { user: users[1]._id, score: 980, streak: 5, rank: 1 },
      { user: users[2]._id, score: 915, streak: 2, rank: 2 },
      { user: users[0]._id, score: 890, streak: 4, rank: 3 },
    ]);

    await Workout.insertMany([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
