class Service{
    constructor(ServiceID, ServiceName, Unit, Price, Quantity, _Status) {
        this.ServiceID = ServiceID,
        this.ServiceName = ServiceName,
        this.Unit = Unit,
        this.Price = Price,
        this.Quantity = Quantity,
        this._Status = _Status
    }
}

module.exports = Service;