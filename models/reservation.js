class Reservation{
    constructor(ReservationNo, Username, PhoneNumber, Deposite, CreateDate, BookingDate, StartTime, EndTime, PriceID, _Status) {
        this.ReservationNo = ReservationNo,
        this.Username = Username,
        this.PhoneNumber = PhoneNumber,
        this.CreateDate = CreateDate,
        this.BookingDate = BookingDate,
        this.StartTime = StartTime,
        this.EndTime = EndTime,
        this.PriceID = PriceID,
        this._Status = _Status
    }
}

module.exports = Reservation;