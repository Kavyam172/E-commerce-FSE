const Orders = require("../models/orders");

async function getOrders(req, res) {
    const orders = new Orders();
    try {
        const orders = await orders.getOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getOrderById(req, res) {
    const orders = new Orders();
    try {
        const order = await orders.getOrderById(req.params.id);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function createOrder(req, res) {
    const orders = new Orders();
    try {
        const order = await orders.createOrder(req.body);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function updateOrder(req, res) {
    const orders = new Orders();
    try {
        const order = await orders.updateOrder(req.params.id, req.body);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function deleteOrder(req, res) {
    const orders = new Orders();
    try {
        const order = await orders.deleteOrder(req.params.id);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getOrderByUserId(req, res) {
    const orders = new Orders();
    try {
        const order = await orders.getOrderByUserId(req.params.userId);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getOrderByProductId(req, res) {
    const orders = new Orders();
    try {
        const order = await orders.getOrderByProductId(req.params.productId);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderByUserId,
    getOrderByProductId
}