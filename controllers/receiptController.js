var config = require('../dbconfig');
const sql = require('mssql');


async function getReceipts() {
    try {
        let pool = await sql.connect(config);
        let Receipts = await pool.request().query("SELECT * from RECEIPT");
        return Receipts.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getReceipt(ReceiptNo) {
    try {
        let pool = await sql.connect(config);
        let Receipt = await pool.request()
            .input('input_parameter',sql.NVarChar, ReceiptNo)
            .query('SELECT * from RECEIPT where ReceiptNo = @input_parameter');
        return Receipt.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addReceipt(Receipt) {
    try {
        let pool = await sql.connect(config);
        let insertReceipt = await pool.request()
            .input('ReceiptNo',sql.NVarChar, Receipt.ReceiptNo)
            .input('_Date',sql.VarChar, Receipt._Date)
            .input('Username',sql.NVarChar, Receipt.Username)
            .input('ExtraTime',sql.Float, Receipt.ExtraTime)
            .input('ReservationNo',sql.NVarChar, Receipt.ReservationNo)
            .input('Payment',sql.NVarChar, Receipt.Payment)
            .execute('AddReceipt');
        return insertReceipt.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editReceipt(Receipt) {
    try {
        let pool = await sql.connect(config);
        let editReceipt = await pool.request()
            .input('ReceiptNo',sql.NVarChar, Receipt.ReceiptNo)
            .input('_NewDate',sql.VarChar, Receipt._NewDate)
            .input('NewUsername',sql.NVarChar, Receipt.NewUsername)
            .input('NewExtraTime',sql.Float, Receipt.NewExtraTime)
            .input('NewReservationNo',sql.NVarChar, Receipt.NewReservationNo)
            .input('NewPayment',sql.NVarChar, Receipt.NewPayment)
            .execute('EditReceipt');
        return editReceipt.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getReceipts : getReceipts,
    getReceipt : getReceipt,
    addReceipt : addReceipt,
    editReceipt : editReceipt,
}