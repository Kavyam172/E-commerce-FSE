const express = require('express');
const router = express.Router();

const { getCartByUserId,getCarts,addItem,reduceItem,removeItem,clearCart} = require("../controllers/cartController");

router.get('/',getCarts);
router.get('/:id',getCartByUserId);
router.post('/add',addItem);
router.post('/reduce',reduceItem);
router.post('/remove',removeItem);
router.post('/clear',clearCart);

module.exports = router;