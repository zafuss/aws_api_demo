class Court{
    constructor(CourtID, CourtName, _Status, StartDate, BranchID) {
        this.CourtID = CourtID,
        this.CourtName = CourtName,
        this._Status = _Status,
        this.StartDate = StartDate,
        this.BranchID = BranchID
    }
}

module.exports = Court;