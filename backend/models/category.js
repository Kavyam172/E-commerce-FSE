const dbConnection = require('../config/dbConnect');

class Category {

    constructor() {
        this.db = dbConnection;
    }

    async getCategories() {
        const sql = 'CALL getCategories()';
        return this.db.query(sql);
    }

    async getCategoryById(id) {
        const sql = 'CALL getCategoryById(?)';
        return this.db.query(sql, [id]);
    }

    async createCategory(category) {
        const sql = 'CALL addCategory(?)';
        return this.db.query(sql, [category]);
    }

    async updateCategory(id, category) {
        const sql = 'CALL updateCategory(?, ?)';
        return this.db.query(sql, [id, category]);
    }

    async deleteCategory(id) {
        const sql = 'CALL deleteCategory(?)';
        return this.db.query(sql, [id]);
    }
}

module.exports = Category;