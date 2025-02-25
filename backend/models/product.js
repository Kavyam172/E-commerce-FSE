const dbConnection = require('../config/dbConnect');

class Product {

    constructor() {
        this.db = dbConnection;
    }

    async getProducts() {
        const sql = 'CALL getProducts()';
        return await this.db.query(sql)
    }

    async getProductById(id) {
        const sql = 'CALL getProductById(?)';
        return await this.db.query(sql, [id]);
    }

    async createProduct(product) {
        const sql = 'CALL addProduct(?, ?, ?, ?, ?)';
        return await this.db.query(sql, [product.name, product.description, product.price, product.category_id, product.image]);
    }

    async updateProduct(id, product) {
        const sql = 'CALL updateProduct(?, ?, ?, ?, ?, ?)';
        return await this.db.query(sql, [id, product.name, product.description, product.price, product.category_id, product.image]);
    }

    async deleteProduct(id) {
        const sql = 'CALL deleteProduct(?)';
        return await this.db.query(sql, [id]);
    }

    async getProductsByCategory(category_id) {
        //TODO: Implement this method
        const sql = 'CALL getProductsByCategory(?)';
        return await this.db.query(sql, [category_id]);
    }

    async getProductsBySearch(search) {
        //TODO: Implement this method
        const sql = 'CALL getProductsBySearch(?)';
        return await this.db.query(sql, [search]);
    }

    async getProductsByPrice(price) {
        //TODO: Implement this method
        const sql = 'CALL getProductsByPrice(?)';
        return await this.db.query(sql, [price]);
    }

    async getProductsByPriceRange(min, max) {
        //TODO: Implement this method
        const sql = 'CALL getProductsByPriceRange(?, ?)';
        return await this.db.query(sql, [min, max]);
    }
}

module.exports = Product;