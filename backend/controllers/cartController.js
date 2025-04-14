const Cart = require('../models/cart');

async function getCarts(req, res) {
    const cart = new Cart();
    try {
        const carts = await cart.getCarts();
        res.json(carts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function getCartByUserId(req, res) {
    const cart = new Cart();
    try {
        const userId = req.params.id;
        const carts = await cart.getCartContents(userId);
        res.json(carts[0][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function addItem(req, res) {
    const cart = new Cart();
    try {
        const { userid, productid } = req.body;
        const carts = await cart.addItem(userid, productid);
        res.json(carts[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function reduceItem(req, res) {
    const cart = new Cart();
    try {
        const { userid, productid } = req.body;
        const carts = await cart.reduceItem(userid, productid);
        res.json(carts[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function removeItem(req, res) {
    const cart = new Cart();
    try {
        const { userid, productid } = req.body;
        const carts = await cart.removeItem(userid,productid);
        res.json(carts[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function clearCart(req, res) {
    const cart = new Cart();
    try {
        const userid = req.body.userid;
        const carts = await cart.clearCart(userid);
        res.json(carts[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    getCarts,
    getCartByUserId,
    addItem,
    reduceItem,
    removeItem,
    clearCart
}