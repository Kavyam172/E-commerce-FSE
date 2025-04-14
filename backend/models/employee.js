const dbConnection = require("../config/dbConnect");

class Employee {
    constructor() {
        this.db = dbConnection;
    }

    async getEmployees() {
        const sql = 'CALL getEmployees()';
        return await this.db.query(sql);
    }

    async getEmployeeById(id) {
        const sql = 'CALL getEmployeeById(?)';
        return await this.db.query(sql, [id]);
    }

    async createEmployee(employee) {
        const sql = 'CALL addEmployee(? , ? , ? , ? , ? , ? )';
        return await this.db.query(sql, [employee.fname, employee.lname, employee.deptid, employee.desigid, employee.salary,employee.userid]);
    }

    async updateEmployee(id, employee) {
        const sql = 'CALL updateEmployee(? , ? , ? , ? , ? , ?)';
        return await this.db.query(sql, [id, employee.fname, employee.lname, employee.deptid, employee.desigid, employee.salary,employee.userid]);
    }

    async deleteEmployee(id) {
        const sql = 'CALL deleteEmployee(?)';
        return await this.db.query(sql, [id]);
    }

    async getEmployeeByEmail(email) {
        const sql = 'CALL getEmployeeByEmail(?)';
        return await this.db.query(sql, [email]);
    }

    async getEmployeeByDepartment(department) {
        const sql = 'CALL getEmployeeByDepartment(?)';
        return await this.db.query(sql, [department]);
    }

    async getEmployeeByDesignation(designation) {
        const sql = 'CALL getEmployeeByDesignation(?)';
        return await this.db.query(sql, [designation]);
    }

    async getEmployeeByStatus(status) {
        const sql = 'CALL getEmployeeByStatus(?)';
        return await this.db.query(sql, [status]);
    }
}