const express = require('express');
const router = express.Router();

const { checkoutCart } = require('../controllers/orderControllers');

// Route to handle checkout cart by user
router.post('/checkout', checkoutCart);

module.exports = router;