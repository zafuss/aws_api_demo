class Receipt{
    constructor(ReceiptNo, _Date, Total, ExtraTime, ReservationNo, Payment) {
        this.ReceiptNo = ReceiptNo,
        this._Date = _Date,
        this.Total = Total,
        this.ExtraTime = ExtraTime,
        this.ReservationNo = ReservationNo,
        this.Payment = Payment 
    }
}

module.exports = Receipt;