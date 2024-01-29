var config = require('../dbconfig');
const sql = require('mssql');

async function getReservations() {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query("SELECT * from RESERVATION");
        return customers.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getReservation(ReservationNo) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter',sql.NVarChar, ReservationNo)
            .query('SELECT * from RESERVATION where ReservationNo = @input_parameter');
        return customer.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addReservation(customer) {
    try {
        let pool = await sql.connect(config);
        let insertReservation = await pool.request()
            .input('ReservationNo',sql.NVarChar, customer.ReservationNo)
            .input('PhoneNumber',sql.VarChar, customer.PhoneNumber)
            .input('Deposite',sql.Decimal, customer.Deposite)
            .input('BookingDate',sql.VarChar, customer.BookingDate)
            .input('StartTime',sql.VarChar, customer.StartDate)
            .input('EndTime',sql.VarChar, customer.EndDate)
            .input('_Status',sql.Int, customer._Status)
            .execute('AddReservation');
        return insertReservation.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editReservation(customer) {
    try {
        let pool = await sql.connect(config);
        let editReservation = await pool.request()
            .input('ReservationNo',sql.NVarChar, customer.ReservationNo)
            .input('NewPhoneNumber',sql.VarChar, customer.NewPhoneNumber)
            .input('NewDeposite',sql.Decimal, customer.NewDeposite)
            .input('NewBookingDate',sql.VarChar, customer.NewBookingDate)
            .input('NewStartTime',sql.VarChar, customer.NewStartDate)
            .input('NewEndTime',sql.VarChar, customer.NewEndDate)
            .input('_NewStatus',sql.Int, customer._NewStatus)
            .execute('EditReservation');
        return editReservation.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteReservation(ReservationNo) {
    try {
        let pool = await sql.connect(config);
        let deleteReservation = await pool.request()
            .input('ReservationNo',sql.NVarChar, ReservationNo)
            .execute('DeleteReservation');
        return deleteReservation.recordsets;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getReservations : getReservations,
    getReservation : getReservation,
    addReservation : addReservation,
    editReservation : editReservation,
    deleteReservation : deleteReservation
}