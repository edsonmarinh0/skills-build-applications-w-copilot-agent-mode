import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
