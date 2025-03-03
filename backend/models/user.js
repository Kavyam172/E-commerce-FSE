const dbConnection = require('../config/dbConnect');

class User {
      
    constructor(){
        this.db = dbConnection;
    }

    async getUsers(){
        const sql = 'CALL getUsers()';
        return await this.db.query(sql);
    }

    async getUserById(id){
        const sql = 'CALL getUserById(?)';
        return await this.db.query(sql, [id]);
    }

    async createUser(user){
        const sql = 'CALL addUser(?, ?, ?, ?, ?, ?)';
        return await this.db.query(sql, [user.username, user.password,user.dob,user.email,user.mobileno, user.role]);
    }

    async updateUser(id, user){
        const sql = 'CALL updateUser(?, ?, ?, ?, ?, ?, ?)';
        return await this.db.query(sql, [id, user.username,user.password,user.dob, user.email,user.mobileno, user.role]);
    }

    async deleteUser(id){
        const sql = 'CALL deleteUser(?)';
        return await this.db.query(sql, [id]);
    }

    async getUserByEmail(email){
        const sql = 'CALL getUserByEmail(?)';
        return await this.db.query(sql, [email]);
    }

    async getUserByRole(role){
        const sql = 'CALL getUserByRole(?)';
        return await this.db.query(sql, [role]);
    }

    async getUserByStatus(status){
        const sql = 'CALL getUserByStatus(?)';
        return await this.db.query(sql, [status]);
    }

    async getUserBySearch(search){
        const sql = 'CALL getUserBySearch(?)';
        return await this.db.query(sql, [search]);
    }

    async getUserByRoleAndStatus(role, status){
        const sql = 'CALL getUserByRoleAndStatus(?, ?)';
        return await this.db.query(sql, [role, status]);
    }

    async getUserByRoleAndSearch(role, search){
        const sql = 'CALL getUserByRoleAndSearch(?, ?)';
        return await this.db.query(sql, [role, search]);
    }

    async getUserByStatusAndSearch(status, search){
        const sql = 'CALL getUserByStatusAndSearch(?, ?)';
        return await this.db.query(sql, [status, search]);
    }

    async getUserByRoleAndStatusAndSearch(role, status, search){
        const sql = 'CALL getUserByRoleAndStatusAndSearch(?, ?, ?)';
        return await this.db.query(sql, [role, status, search]);
    }
}

module.exports = User;