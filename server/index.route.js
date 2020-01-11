const express = require('express');
const userRoutes = require('./user/user.router');
const categoryRoutes = require('./category/category.router');
const authRoutes = require('./auth/auth.route');

const router = express.Router();

// GET /health-check - Check service health
router.get('/health-check', (req, res) => 
  res.send('OK')
)
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/category', categoryRoutes);


module.exports = router