class ServiceReceipt{
    constructor(ServiceReceiptNo, CreateDate, Total, PhoneNumber, Username) {
        this.ServiceReceiptNo = ServiceReceiptNo,
        this.CreateDate = CreateDate,
        this.Total = Total,
        this.PhoneNumber = PhoneNumber,
        this.Username = Username
    }
}

module.exports = ServiceReceipt;