const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const path = require('path');

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the file path/URL for frontend use
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
