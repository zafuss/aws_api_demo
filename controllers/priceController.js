var config = require('../dbconfig');
const sql = require('mssql');


async function getPrices() {
    try {
        let pool = await sql.connect(config);
        let prices = await pool.request().query("SELECT * from PRICE");
        return prices.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getPrice(PriceID) {
    try {
        let pool = await sql.connect(config);
        let price = await pool.request()
            .input('input_parameter',sql.VarChar, PriceID)
            .query('SELECT * from PRICE where PriceID = @input_parameter');
        return price.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addPrice(price) {
    try {
        let pool = await sql.connect(config);
        let insertPrice = await pool.request()
            .input('PriceID',sql.VarChar, price.PriceID)
            .input('PriceTag',sql.Decimal, price.PriceTag)
            .input('TimeFactor',sql.float, price.TimeFactor)
            .input('DateFactor',sql.float, price.DateFactor)
            .input('_Status',sql.Int, price._Status)
            .execute('AddPrice');
        return insertPrice.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editPrice(price) {
    try {
        let pool = await sql.connect(config);
        let editPrice = await pool.request()
            .input('PriceID',sql.VarChar, price.PriceID)
            .input('NewPriceTag',sql.Decimal, price.PriceTag)
            .input('NewTimeFactor',sql.float, price.TimeFactor)
            .input('NewDateFactor',sql.float, price.DateFactor)
            .execute('EditPrice');
        return editPrice.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function enablePrice(priceID) {
    try {
        let pool = await sql.connect(config);
        let editPrice = await pool.request()
            .input('PriceID', sql.VarChar, priceID)
            .execute('EnablePrice');
        return editPrice.recordsets;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getPrices : getPrices,
    getPrice : getPrice,
    addPrice : addPrice,
    editPrice : editPrice,
    enablePrice : enablePrice
}