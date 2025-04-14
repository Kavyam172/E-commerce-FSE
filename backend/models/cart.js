const dbConnection = require("../config/dbConnect");

class Cart {
    constructor() {
        this.db = dbConnection;
    }

    async getCarts() {
        const sql = 'CALL getCarts';
        return await this.db.query(sql); 
        
    }
    
    async getOrCreateCartIdByUserId(userid){
        const sql = 'CALL GetOrCreateCartIdByUser(?)';
        return await this.db.query(sql,[userid])
    }

    async getCartContents(userid){
        const sql = 'CALL GetCartContentsByUser(?)';
        return await this.db.query(sql,[userid])
    }

    async addItem(userid,productid){
        const sql = 'CALL AddOrUpdateCartItemByUser(?,?,?)';
        return await this.db.query(sql,[userid,productid,1])
    }

    async reduceItem(user,productid){
        const sql = 'CALL AddOrUpdateCartItemByUser(?,?,?)';
        return await this.db.query(sql,[user,productid,-1])
    }

    async removeItem(userid,productid){
        const sql = 'CALL RemoveCartItemByUser(?,?)';
        return await this.db.query(sql,[userid,productid])
    }

    async clearCart(userid){
        const sql = 'CALL ClearCartByUser(?)';
        return await this.db.query(sql,[userid])

    }
}

module.exports = Cart;