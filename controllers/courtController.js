var config = require('../dbconfig');
const sql = require('mssql');


async function getCourts() {
    try {
        let pool = await sql.connect(config);
        let courtes = await pool.request().query("SELECT * from COURT");
        return courtes.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getCourt(CourtID) {
    try {
        let pool = await sql.connect(config);
        let court = await pool.request()
            .input('input_parameter',sql.NVarChar, CourtID)
            .query('SELECT * from COURT where CourtID = @input_parameter');
        return court.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addCourt(court) {
    try {
        let pool = await sql.connect(config);
        let insertCourt = await pool.request()
            .input('CourtID',sql.NVarChar, court.CourtID)
            .input('CourtName',sql.NVarChar, court.CourtName)
            .input('_Status',sql.NVarChar, court._Status)
            .input('StartDate',sql.VarChar, court.StartDate)
            .input('BranchID',sql.NVarChar, court.BranchID)
            .execute('AddCourt');
        return insertCourt.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editCourt(court) {
    try {
        let pool = await sql.connect(config);
        let editCourt = await pool.request()
            .input('CourtID', sql.NVarChar, court.CourtID)
            .input('NewCourtName',sql.NVarChar, court.NewCourtName)
            .input('_NewStatus',sql.NVarChar, court._NewStatus)
            .input('NewStartDate',sql.VarChar, court.NewStartDate)
            .input('NewBranchID',sql.NVarChar, court.NewBranchID)
            .execute('EditCourt');
        return editCourt.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCourts : getCourts,
    getCourt : getCourt,
    addCourt : addCourt,
    editCourt : editCourt,
}