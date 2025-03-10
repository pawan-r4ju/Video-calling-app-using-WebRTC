// server/routes/signalingRoutes.js
import express from 'express';

const router = express.Router();

// Example route (optional)
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong!' });
});

export default router;