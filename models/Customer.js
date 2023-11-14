class Customer{
    constructor(PhoneNumber, FullName, Email, _Password, Username, _Status) {
        this.PhoneNumber = PhoneNumber,
        this.FullName = FullName,
        this.Email = Email
        this._Password = _Password,
        this.Username = Username,
        this._Status = _Status
    }
}

module.exports = Customer;