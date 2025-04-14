const dbConnection = require("../config/dbConnect");

class Orders {

    
    constructor() {
        this.db = dbConnection;
    }

    async checkoutCartByUser(userid){
        const sql = 'CALL CheckoutCartByUser(?)';
        return await this.db.query(sql, [userid]);
    }
}   

module.exports = Orders;