var config = require('../dbconfig');
const sql = require('mssql');


async function getServiceDetails() {
    try {
        let pool = await sql.connect(config);
        let ServiceDetails = await pool.request().query("SELECT * from SERVICE_DETAIL");
        return ServiceDetails.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getServiceDetail(ServiceReceiptNo) {
    try {
        let pool = await sql.connect(config);
        let ServiceDetail = await pool.request()
            .input('input_parameter',sql.NVarChar, ServiceReceiptNo)
            .query('SELECT * from SERVICE_DETAIL where ServiceReceiptNo = @input_parameter');
        return ServiceDetail.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addServiceDetail(ServiceDetail) {
    try {
        let pool = await sql.connect(config);
        let insertServiceDetail = await pool.request()
            .input('ServiceReceiptNo',sql.NVarChar, ServiceDetail.ServiceReceiptNo)
            .input('ServiceID',sql.VarChar, ServiceDetail.ServiceID)
            .input('Quantity',sql.Int, ServiceDetail.Quantity)
            .execute('AddServiceDetail');
        return insertServiceDetail.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editServiceDetail(ServiceDetail) {
    try {
        let pool = await sql.connect(config);
        let editServiceDetail = await pool.request()
            .input('ServiceReceiptNo',sql.NVarChar, ServiceDetail.ServiceReceiptNo)
            .input('NewServiceID',sql.VarChar, ServiceDetail.NewServiceID)
            .input('NewQuantity',sql.Int, ServiceDetail.NewQuantitys)
            .execute('EditServiceDetail');
        return editServiceDetail.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getServiceDetails : getServiceDetails,
    getServiceDetail : getServiceDetail,
    addServiceDetail : addServiceDetail,
    editServiceDetail : editServiceDetail,
}