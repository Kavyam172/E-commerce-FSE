const dbConnect = require('./config/dbConnect');

class Category {

    constructor() {
        this.db = dbConnect;
    }

    async getCategories() {
        const sql = 'CALL getCategories()';
        return await this.db.query(sql);
    }

    async getCategoryById(id) {
        const sql = 'CALL getCategoryById(?)';
        return await this.db.query(sql, [id]);
    }

    async createCategory(category) {
        const sql = 'CALL addCategory(?)';
        return await this.db.query(sql, [category]);
    }

    async updateCategory(id, category) {
        const sql = 'CALL updateCategory(?, ?)';
        return await this.db.query(sql, [id, category]);
    }

    async deleteCategory(id) {
        const sql = 'CALL deleteCategory(?)';
        return await this.db.query(sql, [id]);
    }
}

module.exports = Category;