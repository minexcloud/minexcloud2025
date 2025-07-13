const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/simulate', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profit = user.hashrate * 0.00001;
    user.balanceETC += profit;

    if (user.freeHashrateExpires && user.freeHashrateExpires < new Date()) {
      user.hashrate = Math.max(user.hashrate - 1, 0);
      user.freeHashrateExpires = null;
    }

    await user.save();
    res.json({ balanceETC: user.balanceETC });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
