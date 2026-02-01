import StyleResult from '../models/StyleResult.js';

export async function getResults(req, res) {
  try {
    const userId = req.user._id;
    const result = await StyleResult.findOne({ userId }).sort({ createdAt: -1 });
    if (!result) {
      return res.status(404).json({ error: 'No results found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getResultsByShareToken(req, res) {
  try {
    const { token } = req.params;
    const result = await StyleResult.findOne({ shareToken: token });
    if (!result) {
      return res.status(404).json({ error: 'Results not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function saveResults(req, res) {
  try {
    const result = await StyleResult.findOneAndUpdate(
      { userId: req.user._id },
      { saved: true },
      { new: true }
    ).sort({ createdAt: -1 });
    if (!result) return res.status(404).json({ error: 'No results found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
