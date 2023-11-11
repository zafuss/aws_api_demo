var config = require('../dbconfig');
const sql = require('mssql');


async function getServices() {
    try {
        let pool = await sql.connect(config);
        let servicees = await pool.request().query("SELECT * from _SERVICE");
        return servicees.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getService(ServiceID) {
    try {
        let pool = await sql.connect(config);
        let service = await pool.request()
            .input('input_parameter',sql.NVarChar, ServiceID)
            .query('SELECT * from _SERVICE where ServiceID = @input_parameter');
        return service.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addService(service) {
    try {
        let pool = await sql.connect(config);
        let insertService = await pool.request()
            .input('ServiceID',sql.NVarChar, service.ServiceID)
            .input('ServiceName',sql.NVarChar, service.ServiceName)
            .input('Unit',sql.NVarChar, service.Unit)
            .input('Price',sql.Decimal, service.Price)
            .input('Quantity',sql.Int, service.Quantity)
            .input('_Status',sql.VarChar, service._Status)
            .execute('AddService');
        return insertService.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editService(service) {
    try {
        let pool = await sql.connect(config);
        let editService = await pool.request()
            .input('ServiceID',sql.NVarChar, service.ServiceID)
            .input('NewServiceName',sql.NVarChar, service.NewServiceName)
            .input('NewUnit',sql.NVarChar, service.NewUnit)
            .input('NewPrice',sql.Decimal, service.NewPrice)
            .input('NewQuantity',sql.Int, service.NewQuantity)
            .input('_NewStatus',sql.VarChar, service._NewStatus)
            .execute('EditService');
        return editService.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function changeServiceQuantity(ServiceID, NewQuantity) {
    try {
        let pool = await sql.connect(config);
        let changeServiceQuantity = await pool.request()
            .input('ServiceID',sql.NVarChar, ServiceID)
            .input('NewQuantity',sql.Int, NewQuantity)
            .execute('ChangeServiceQuantity');
        return changeServiceQuantity.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getServices : getServices,
    getService : getService,
    addService : addService,
    editService : editService,
    changeServiceQuantity : changeServiceQuantity
}