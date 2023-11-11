var config = require('../dbconfig');
const sql = require('mssql');


async function getServiceReceipts() {
    try {
        let pool = await sql.connect(config);
        let ServiceReceipts = await pool.request().query("SELECT * from SERVICE_RECEIPT");
        return ServiceReceipts.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getServiceReceipt(ServiceReceiptNo) {
    try {
        let pool = await sql.connect(config);
        let ServiceReceipt = await pool.request()
            .input('input_parameter',sql.NVarChar, ServiceReceiptNo)
            .query('SELECT * from SERVICE_RECEIPT where ServiceReceiptNo = @input_parameter');
        return ServiceReceipt.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addServiceReceipt(ServiceReceipt) {
    try {
        let pool = await sql.connect(config);
        let insertServiceReceipt = await pool.request()
            .input('ServiceReceiptNo',sql.NVarChar, ServiceReceipt.ServiceReceiptNo)
            .input('CreateDate',sql.VarChar, ServiceReceipt.CreateDate)
            .input('Total',sql.Decimal, ServiceReceipt.Total)
            .input('PhoneNumber',sql.VarChar, ServiceReceipt.PhoneNumber)
            .input('Username',sql.NVarChar, ServiceReceipt.Username)
            .execute('AddServiceReceipt');
        return insertServiceReceipt.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editServiceReceipt(ServiceReceipt) {
    try {
        let pool = await sql.connect(config);
        let editServiceReceipt = await pool.request()
        .input('ServiceReceiptNo',sql.NVarChar, ServiceReceipt.ServiceReceiptNo)
        .input('NewCreateDate',sql.VarChar, ServiceReceipt.NewCreateDate)
        .input('NewTotal',sql.Decimal, ServiceReceipt.NewTotal)
        .input('NewPhoneNumber',sql.VarChar, ServiceReceipt.NewPhoneNumber)
        .input('NewUsername',sql.NVarChar, ServiceReceipt.NewUsername)
            .execute('EditServiceReceipt');
        return editServiceReceipt.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getServiceReceipts : getServiceReceipts,
    getServiceReceipt : getServiceReceipt,
    addServiceReceipt : addServiceReceipt,
    editServiceReceipt : editServiceReceipt,
}