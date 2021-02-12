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
<<<<<<< HEAD
router.use('/email', require('./sendemail.js'))
=======
router.use('/mercadopago', require('./mercadopago.js'))
>>>>>>> 3ba85ec4ccacf4611fcdb9b714912aeb2d7b2ca2


module.exports = router;
