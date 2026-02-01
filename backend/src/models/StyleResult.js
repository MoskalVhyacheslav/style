import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String
}, { _id: false });

const outfitSchema = new mongoose.Schema({
  id: String,
  title: String,
  images: [imageSchema]
}, { _id: false });

const styleResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizAnswerId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizAnswer' },
  styleProfile: {
    id: String,
    name: String,
    description: String,
    keywords: [String]
  },
  outfits: [outfitSchema],
  saved: { type: Boolean, default: false },
  shareToken: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('StyleResult', styleResultSchema);
