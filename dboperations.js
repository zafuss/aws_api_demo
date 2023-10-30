var config = require('./dbconfig');
const sql = require('mssql');


async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from _USER");
        return users.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getUser(Username) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('input_parameter',sql.NVarChar, Username)
            .query('SELECT * from _USER where Username = @input_parameter');
        return user.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addUser(user) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('Username',sql.NVarChar, user.Username)
            .input('_Password',sql.NVarChar, user._Password)
            .input('_Name',sql.NVarChar, user._Name)
            .input('_Role',sql.NVarChar, user._Role)
            .input('Email',sql.NVarChar, user.Email)
            .input('PhoneNumber',sql.NVarChar, user.PhoneNumber)
            .input('_Status',sql.NVarChar, user._Status)
            .execute('InsertUser');
        return insertUser.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers : getUsers,
    getUser : getUser,
    addUser : addUser
}