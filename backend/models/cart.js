const dbConnection = require("../config/dbConnect");

class Cart {
    constructor() {
        this.db = dbConnection;
    }

    async getCart() {
        const sql = 'CALL getCart()';
        return await this.db.query(sql);
    }

    async getCartById(id) {
        const sql = 'CALL getCartById(?)';
        return await this.db.query(sql, [id]);
    }

    async createCart(cart) {
        const sql = 'CALL addCart(?, ?, ?)';
        return await this.db.query(sql, [cart.customerId, cart.productId, cart.quantity]);
    }

    async updateCart(id, cart) {
        const sql = 'CALL updateCart(?, ?, ?, ?)';
        return await this.db.query(sql, [id, cart.userId, cart.productId, cart.quantity]);
    }

    async deleteCart(id) {
        const sql = 'CALL deleteCart(?)';
        return await this.db.query(sql, [id]);
    }

    async getCartByUserId(userId) {
        const sql = 'CALL getCartByCustomerId(?)';
        return await this.db.query(sql, [userId]);
    }

    async getCartByProductId(productId) {
        const sql = 'CALL getCartByProductId(?)';
        return await this.db.query(sql, [productId]);
    }
}