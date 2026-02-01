import mongoose from 'mongoose';

const quizAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferredStyles: [{ type: String }],
  lifestyle: { type: String },
  favoriteBrands: [{ type: String }],
  budget: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('QuizAnswer', quizAnswerSchema);
