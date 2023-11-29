const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./toughtRoutes');
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;