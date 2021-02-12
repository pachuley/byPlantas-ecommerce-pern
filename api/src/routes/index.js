const { Router } = require('express');
// import all routers;


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', require('./product.js'));
router.use('/category', require('./category.js'))
router.use('/orders', require('./order.js'))
router.use('/users', require('./users.js'))
router.use('/email', require('./sendemail.js'))


module.exports = router;
