import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'moderate' },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
