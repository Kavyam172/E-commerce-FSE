const express = require('express');
const router = express.Router();

const { getCart, getCartById, createCart, updateCart, deleteCart, getCartByUserId, getCartByProductId } = require('../controllers/cartController');

router.get('/', getCart);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.get('/user/:userId', getCartByUserId);
router.get('/product/:productId', getCartByProductId);