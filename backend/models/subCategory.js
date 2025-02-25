const dbConnection = require('../config/dbConnect');

class SubCategory{

    constructor(){
        this.db = dbConnection;
    }

    //TODO: Create Stored Procedures for the following methods
    async getSubCategories(){
        const sql = 'CALL getSubCategories()';
        return this.db.query(sql);
    }

    async getSubCategoryById(id){
        const sql = 'CALL getSubCategoryById(?)';
        return this.db.query(sql, [id]);
    }

    async getSubCategoriesByCategoryId(categoryId){
        const sql = 'CALL getSubCategoriesByCategoryId(?)';
        return this.db.query(sql, [categoryId]);
    }

    async createSubCategory(subCategory){
        const sql = 'CALL addSubCategory(?, ?)';
        return this.db.query(sql, [subCategory.name, subCategory.categoryId]);
    }


    async updateSubCategory(id, subCategory){
        const sql = 'CALL updateSubCategory(?, ?, ?)';
        return this.db.query(sql, [id, subCategory.name, subCategory.categoryId]);
    }

    async deleteSubCategory(id){
        const sql = 'CALL deleteSubCategory(?)';
        return this.db.query(sql, [id]);
    }
}

module.exports = SubCategory;