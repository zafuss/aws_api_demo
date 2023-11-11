var config = require('../dbconfig');
const sql = require('mssql');


async function getRFDetails() {
    try {
        let pool = await sql.connect(config);
        let RFDetails = await pool.request().query("SELECT * from RF_Detail");
        return RFDetails.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getRFDetail(ReservationNo) {
    try {
        let pool = await sql.connect(config);
        let RFDetail = await pool.request()
            .input('input_parameter',sql.NVarChar, ReservationNo)
            .query('SELECT * from RF_Detail where ReservationNo = @input_parameter');
        return RFDetail.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addRFDetail(RFDetail) {
    try {
        let pool = await sql.connect(config);
        let insertRFDetail = await pool.request()
            .input('ReservationNo',sql.NVarChar, RFDetail.ReservationNo)
            .input('CourtID',sql.NVarChar, RFDetail.CourtID)
            .input('Note',sql.NVarChar, RFDetail.Note)
            .execute('AddRFDetail');
        return insertRFDetail.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editRFDetailNote(RFDetail) {
    try {
        let pool = await sql.connect(config);
        let editRFDetail = await pool.request()
            .input('ReservationNo',sql.NVarChar, RFDetail.ReservationNo)
            .input('CourtID',sql.NVarChar, RFDetail.CourtID)
            .input('NewNote',sql.NVarChar, RFDetail.NewNote)
            .execute('EditRFDetailNote');
        return editRFDetail.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function delRFDetail(RFDetail) {
    try {
        let pool = await sql.connect(config);
        let editRFDetail = await pool.request()
            .input('ReservationNo',sql.NVarChar, RFDetail.ReservationNo)
            .input('CourtID',sql.NVarChar, RFDetail.CourtID)
            .execute('DelCourtInRFDetail');
        return editRFDetail.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRFDetails : getRFDetails,
    getRFDetail : getRFDetail,
    addRFDetail : addRFDetail,
    editRFDetailNote : editRFDetailNote,
    delRFDetail : delRFDetail
}