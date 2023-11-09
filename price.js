class Price{
    constructor(PriceID, PriceTag, TimeFactor, DateFactor, _Status) {
        this.PriceID = PriceID,
        this.PriceTag = PriceTag,
        this.TimeFactor = TimeFactor,
        this.DateFactor = DateFactor,
        this._Status = _Status
    }
}

module.exports = Price;