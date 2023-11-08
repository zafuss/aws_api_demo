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

async function isUserExists(username) {
    try {
        let pool = await sql.connect(config);
        let user  = await pool.getUserByUsername(username); // Thay thế bằng phương thức thực tế để lấy người dùng từ cơ sở dữ liệu
        return !!user; // Trả về true nếu người dùng tồn tại, ngược lại trả về false
    } catch (error) {
        console.error(error);
        return false; // Trong trường hợp xảy ra lỗi, trả về false
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

async function editUser(user) {
    try {
        let pool = await sql.connect(config);
        let editUser = await pool.request()
            .input('Username', sql.NVarChar, user.Username)
            .input('NewPassword', sql.NVarChar, user._Password)
            .input('NewName', sql.NVarChar, user._Name)
            .input('NewRole', sql.NVarChar, user._Role)
            .input('NewEmail', sql.NVarChar, user.Email)
            .input('NewPhoneNumber', sql.VarChar, user.PhoneNumber)
            .input('NewStatus', sql.NVarChar, user._Status)
            .execute('EditUser');
        return editUser.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers : getUsers,
    getUser : getUser,
    addUser : addUser,
    editUser : editUser,
    isUserExists : isUserExists
}