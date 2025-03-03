const express = require('express');
const router = express.Router();

const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, getOrderByUserId, getOrderByProductId } = require('../controllers/orderControllers');

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/user/:userId', getOrderByUserId);
router.get('/product/:productId', getOrderByProductId);

module.exports = router;