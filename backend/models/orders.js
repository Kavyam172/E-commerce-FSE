const dbConnection = require("../config/dbConnect");

class Orders {

    constructor() {
        this.db = dbConnection;
    }

    async getOrders(){
        const sql = 'CALL getOrders()';
        return await this.db.query(sql);
    }

    async getOrderById(id){
        const sql = 'CALL getOrderById(?)';
        return await this.db.query(sql, [id]);
    }

    async createOrder(order){
        const sql = 'CALL addOrder(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return await this.db.query(sql, [order.userId, order.productId, order.quantity, order.total, order.status, order.paymentMethod, order.paymentStatus, order.shippingAddress, order.createdAt]);
    }

    async updateOrder(id, order){
        const sql = 'CALL updateOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return await this.db.query(sql, [id, order.userId, order.productId, order.quantity, order.total, order.status, order.paymentMethod, order.paymentStatus, order.shippingAddress, order.createdAt]);
    }

    async deleteOrder(id){
        const sql = 'CALL deleteOrder(?)';
        return await this.db.query(sql, [id]);
    }

    async getOrderByUserId(userId){
        const sql = 'CALL getOrderByUserId(?)';
        return await this.db.query(sql, [userId]);
    }

    async getOrderByProductId(productId){
        const sql = 'CALL getOrderByProductId(?)';
        return await this.db.query(sql, [productId]);
    }
}   

module.exports = Orders;