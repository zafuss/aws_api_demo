var config = require('../dbconfig');
const sql = require('mssql');


async function getCustomers() {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query("SELECT * from CUSTOMER");
        return customers.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getCustomerByEmail(Email) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter',sql.NVarChar, Email)
            .query('SELECT * from CUSTOMER where PhoneNumber = @input_parameter');
        return customer.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getCustomerByPhoneNumber(PhoneNumber) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter',sql.VarChar, PhoneNumber)
            .query('SELECT * from CUSTOMER where PhoneNumber = @input_parameter');
        return customer.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getCustomerByUsername(Username) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter',sql.VarChar, Username)
            .query('SELECT * from CUSTOMER where Username = @input_parameter');
        return customer.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addCustomer(customer) {
    try {
        let pool = await sql.connect(config);
        let insertCustomer = await pool.request()
            .input('PhoneNumber',sql.VarChar, customer.PhoneNumber)
            .input('FullName',sql.NVarChar, customer.FullName)
            .input('Email',sql.NVarChar, customer.Email)
            .execute('AddCustomer');
        return insertCustomer.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editCustomer(customer) {
    try {
        let pool = await sql.connect(config);
        let editCustomer = await pool.request()
            .input('PhoneNumber', sql.VarChar, customer.PhoneNumber)
            .input('NewFullName',sql.NVarChar, customer.FullName)
            .input('NewEmail',sql.NVarChar, customer.Email)
            .execute('EditCustomer');
        return editCustomer.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCustomers : getCustomers,
    getCustomerByPhoneNumber : getCustomerByPhoneNumber,
    getCustomerByEmail : getCustomerByEmail,
    getCustomerByUsername : getCustomerByUsername,
    addCustomer : addCustomer,
    editCustomer : editCustomer,
}