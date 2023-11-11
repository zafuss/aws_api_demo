var config = require('../dbconfig');
const sql = require('mssql');


async function getBranches() {
    try {
        let pool = await sql.connect(config);
        let branches = await pool.request().query("SELECT * from BRANCH");
        return branches.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function getBranch(BranchID) {
    try {
        let pool = await sql.connect(config);
        let branch = await pool.request()
            .input('input_parameter',sql.NVarChar, BranchID)
            .query('SELECT * from BRANCH where BranchID = @input_parameter');
        return branch.recordsets;

    } catch (error) {
        console.log(error);
    }
}

async function addBranch(branch) {
    try {
        let pool = await sql.connect(config);
        let insertBranch = await pool.request()
            .input('BranchID',sql.NVarChar, branch.BranchID)
            .input('BranchName',sql.NVarChar, branch.BranchName)
            .input('_Address',sql.NVarChar, branch._Address)
            .execute('AddBranch');
        return insertBranch.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function editBranch(branch) {
    try {
        let pool = await sql.connect(config);
        let editBranch = await pool.request()
            .input('BranchID', sql.NVarChar, branch.BranchID)
            .input('NewBranchName',sql.NVarChar, branch.NewBranchName)
            .input('_NewAddress',sql.NVarChar, branch._NewAddress)
            .execute('EditBranch');
        return editBranch.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getBranches : getBranches,
    getBranch : getBranch,
    addBranch : addBranch,
    editBranch : editBranch,
}