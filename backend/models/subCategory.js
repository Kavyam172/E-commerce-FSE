const dbConnect = require('./config/dbConnect');

class SubCategory{

    constructor(){
        this.db = dbConnect;
    }

    //TODO: Create Stored Procedures for the following methods
    async getSubCategories(){
        const sql = 'CALL getSubCategories()';
        return await this.db.query(sql);
    }

    async getSubCategoryById(id){
        const sql = 'CALL getSubCategoryById(?)';
        return await this.db.query(sql, [id]);
    }

    async getSubCategoriesByCategoryId(categoryId){
        const sql = 'CALL getSubCategoriesByCategoryId(?)';
        return await this.db.query(sql, [categoryId]);
    }

    async createSubCategory(subCategory){
        const sql = 'CALL addSubCategory(?, ?)';
        return await this.db.query(sql, [subCategory.name, subCategory.categoryId]);
    }


    async updateSubCategory(id, subCategory){
        const sql = 'CALL updateSubCategory(?, ?, ?)';
        return await this.db.query(sql, [id, subCategory.name, subCategory.categoryId]);
    }

    async deleteSubCategory(id){
        const sql = 'CALL deleteSubCategory(?)';
        return await this.db.query(sql, [id]);
    }
}

module.exports = SubCategory;