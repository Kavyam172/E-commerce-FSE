const Cart = require('../models/cart');

async function getCart(req, res) {
    const cart = new Cart();
    try {
        const carts = await cart.getCart();
        res.json(carts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getCartById(req, res) {
    const cart = new Cart();
    try {
        const carts = await cart.getCartById(req.params.id);
        res.json(carts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function createCart(req, res) {
    const cart = new Cart();
    try{
        const carts = await cart.createCart(req.body);
        res.json(carts[0]);
    }
    catch{
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function updateCart(req, res) {
    const cart = new Cart();
    try{
        const carts = await cart.updateCart(req.params.id, req.body);
        res.json(carts[0]);
    }
    catch{
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function deleteCart(req, res) {
    const cart = new Cart();
    try{
        const carts = await cart.deleteCart(req.params.id);
        res.json(carts[0]);
    }
    catch{
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getCartByUserId(req, res) {
    const cart = new Cart();
    try{
        const carts = await cart.getCartByUserId(req.params.userId);
        res.json(carts[0]);
    }
    catch{
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getCartByProductId(req, res) {
    const cart = new Cart();
    try{
        const carts = await cart.getCartByProductId(req.params.productId);
        res.json(carts[0]);
    }
    catch{
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    getCart,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
    getCartByUserId,
    getCartByProductId
}