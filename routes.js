const express = require('express');
const router = express.Router();
const { analyzeImage, getReport } = require('./controllers/analyzeController');

router.post('/analyze', analyzeImage);
router.get('/report/:id', getReport);

module.exports = router;