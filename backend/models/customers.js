const dbConnection = require("../config/dbConnect");

class Customers {
    constructor() {
        this.db = dbConnection;
    }

    //TODO: Implement the following methods
    async getCustomers() {
        const sql = 'CALL getCustomers()';
        return await this.db.query(sql);
    }

    async getCustomerById(id) {
        const sql = 'CALL getCustomerById(?)';
        return await this.db.query(sql, [id]);
    }

    async createCustomer(customer) {
        const sql = 'CALL addCustomer(?, ?, ?, ?, ?)';
        return await this.db.query(sql, [customer.name, customer.email, customer.address, customer.phone,customer.userid]);
    }

    async updateCustomer(id, customer) {
        const sql = 'CALL updateCustomer(?, ?, ?, ?, ?, ?)';
        return await this.db.query(sql, [id, customer.name, customer.email, customer.address, customer.phone, customer.userid]);
    }

    async deleteCustomer(id) {
        const sql = 'CALL deleteCustomer(?)';
        return await this.db.query(sql, [id]);
    }

    async getCustomerByEmail(email) {
        const sql = 'CALL getCustomerByEmail(?)';
        return await this.db.query(sql, [email]);
    }
}

module.exports = Customers;