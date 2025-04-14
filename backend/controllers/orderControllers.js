const Orders = require("../models/orders");

async function checkoutCart(req, res) {
    const orders = new Orders();
    try {
        const { userid } = req.body;
        const carts = await orders.checkoutCartByUser(userid);
        res.json(carts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    checkoutCart,
};