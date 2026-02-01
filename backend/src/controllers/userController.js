import User from '../models/User.js';

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateMe(req, res) {
  try {
    const { name, age, height, weight, bodyType } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, age, height, weight, bodyType, updatedAt: new Date() },
      { new: true }
    ).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
