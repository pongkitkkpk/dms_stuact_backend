const express = require('express');
const router = express.Router();
const adminRoutes = require('./src/adminRoutes');
const studentRoutes = require('./src/studentRoutes');

router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);

module.exports = router;
