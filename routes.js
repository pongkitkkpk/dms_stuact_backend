const express = require('express');
const router = express.Router();
const adminRoutes = require('./src/adminRoutes');
const studentRoutes = require('./src/studentRoutes');
// 
// const login = require('./src/login');

router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);
// 
// router.use('/student', login);

module.exports = router;
