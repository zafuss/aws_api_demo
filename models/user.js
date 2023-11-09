class User{
    constructor(Username, _Password, _Name, _Role, Email, PhoneNumber, _Status) {
        this.Username = Username,
        this._Password = _Password,
        this._Name = _Name,
        this._Role = _Role,
        this.Email = Email,
        this.PhoneNumber = PhoneNumber,
        this._Status = _Status
    }
}

module.exports = User;