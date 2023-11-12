CREATE PROCEDURE ChangeUserStatus 
	@Username NVARCHAR(50)
AS
BEGIN
    -- Xác d?nh giá tr? m?i c?a tru?ng Status
    DECLARE @CurrentStatus NVARCHAR(50);
    DECLARE @NewStatus NVARCHAR(50);

    SELECT @CurrentStatus = _Status FROM _USER WHERE Username = @Username;

    IF @CurrentStatus = 'Enabled'
        SET @NewStatus = 'Disabled';
    ELSE
        SET @NewStatus = 'Enabled';

    -- C?p nh?t thông tin ngu?i dùng
    UPDATE _USER
    SET
        _Status = @NewStatus -- C?p nh?t tru?ng Status
    WHERE
        Username = @Username;
END

GO

CREATE PROCEDURE AddCustomer
	@PhoneNumber varchar(13),
	@FullName nvarchar(100),
	@Email nvarchar(100)
AS
BEGIN
	INSERT INTO CUSTOMER VALUES (@PhoneNumber, ISNULL(@FullName, 'unknown'), ISNULL(@Email, 'unknown'))
END


EXEC AddCustomer 
	@PhoneNumber = '0823123124',
	@FullName = N'Phu',
	@Email = null

go


create procedure EditCustomer 
	@PhoneNumber varchar(13),
	@NewFullName nvarchar(100),
	@NewEmail nvarchar(100)
as 
begin
	update CUSTOMER
	set
		FullName = ISNULL(@NewFullName, FullName),
		Email = ISNULL(@NewEmail, Email)
	where 
		PhoneNumber = @PhoneNumber
end

exec EditCustomer
	@PhoneNumber = '0823123123',
	@NewFullName = N'phus',
	@NewEmail = null

select * from CUSTOMER

--PRICE

select * from PRICE

go

CREATE PROCEDURE AddPrice
	@PriceID	varchar(20),
	@PriceTag	decimal,
	@TimeFactor	float,
	@DateFactor	float ,
	@_Status	int
AS
BEGIN
	INSERT INTO PRICE VALUES (@PriceID, @PriceTag, @TimeFactor,@DateFactor,@_Status)
END

go

exec AddPrice 
	@PriceID = 'P003',
	@PriceTag = 20000,
	@TimeFactor = 1.5,
	@DateFactor = 1.5,
	@_Status = 1

go

drop procedure EditPrice

go

create procedure EditPrice
	@PriceID		varchar(20),
	@NewPriceTag	decimal,
	@NewTimeFactor	float,
	@NewDateFactor	float
as 
begin
	update PRICE
	set
		PriceTag = ISNULL(@NewPriceTag, PriceTag),
		TimeFactor = ISNULL(@NewTimeFactor, TimeFactor),
		DateFactor = ISNULL(@NewDateFactor, DateFactor)
	where 
		PriceID = @PriceID
end

go

exec EditPrice
	@PriceID = 'P003',
	@NewPriceTag = null,
	@NewTimeFactor = 1.2,
	@NewDateFactor = 1.3

go

drop procedure EnablePrice

go

CREATE PROCEDURE EnablePrice 
    @PriceID varchar(20)
AS
BEGIN
    UPDATE PRICE
    SET _Status = 0
    WHERE PriceID != @PriceID;

    UPDATE PRICE
    SET _Status = 1
    WHERE PriceID = @PriceID;
END

exec EnablePrice
	@PriceID = 'P002'

select * from PRICE

--RESERVATION

select * from RESERVATION

go

drop procedure AddReservation

go

create procedure AddReservation
	@ReservationNo nvarchar(20),
	@PhoneNumber varchar(13),
	@Deposite decimal,
	@BookingDate varchar(50),
	@StartTime varchar(50),
	@EndTime varchar(50),
	@_Status int
as
begin
	declare @Username nvarchar(50),
			@PriceID varchar(20),
			@CreateDate datetime;

	set @Username = N'customerapp'
	set @PriceID = (select PriceID from PRICE where _Status = 1)
	set @CreateDate = GETUTCDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'SE Asia Standard Time';


	insert into RESERVATION values
		(@ReservationNo,
		@Username,
		@PhoneNumber,
		ISNULL(@Deposite, 0),
		@CreateDate,
		convert(datetime, @BookingDate),
		convert(datetime, @StartTime),
		convert(datetime, @EndTime),
		@PriceID,
		@_Status
		)
end

insert into RESERVATION values (N'Rev0710230010','admin','0337514097',300000,CONVERT(datetime ,'16-10-23 10:34:09 AM',5 ),CONVERT(datetime ,'17-10-23 10:34:09 AM',5 ),'2023-10-07 21:00:00.000','2023-10-07 22:00:00.000','P002',	4)
exec AddReservation
	@ReservationNo = N'Rev1011230003',
	@PhoneNumber = '0823123123',
	@Deposite = null,
    @BookingDate = '2023-11-10 00:00:00',
    @StartTime = '2023-11-11 19:00:00',
    @EndTime = '2023-11-11 21:00:00',
	@_Status = 1

go

drop procedure EditReservation

go

create procedure EditReservation 
	@ReservationNo nvarchar(20),
	@NewPhoneNumber varchar(13),
	@NewDeposite decimal,
	@NewBookingDate varchar(50),
	@NewStartTime varchar(50),
	@NewEndTime varchar(50),
	@_NewStatus int
as
begin
	update RESERVATION
	set PhoneNumber = ISNULL(@NewPhoneNumber, PhoneNumber),
		Deposite = ISNULL(@NewDeposite, Deposite),
		BookingDate = ISNULL(convert(datetime, @NewBookingDate), BookingDate),
		StartTime = ISNULL(convert(datetime, @NewStartTime), StartTime),
		EndTime = ISNULL(convert(datetime, @NewEndTime), EndTime),
		_Status = ISNULL(@_NewStatus, _Status)
	where ReservationNo = @ReservationNo
end

exec EditReservation
    @ReservationNo = N'Rev1011230002',
    @NewPhoneNumber = '0337514096',
    @NewDeposite = 100000,
    @NewBookingDate = '2023-11-10 00:00:00',
    @NewStartTime = '2023-11-11 19:00:00',
    @NewEndTime = '2023-11-11 21:00:00',
    @_NewStatus = 2;

go

create procedure DeleteReservation 
	@ReservationNo nvarchar(20)
as
begin
	delete from RESERVATION
	where ReservationNo = @ReservationNo
end

exec DeleteReservation
	@ReservationNo = N'Rev1011230003'

select * from RESERVATION

go

--BRANCH

create procedure AddBranch
	@BranchID	nvarchar(20),
	@BranchName nvarchar(50),
	@_Address nvarchar(50)
as
begin
	insert into BRANCH values
	(@BranchID,
	@BranchName,
	@_Address)
end

go

select * from BRANCH

exec AddBranch
	@BranchID = N'TD001',
	@BranchName = N'Thu Duc',
	@_Address = N'Le Van Viet'

go

create procedure EditBranch
	@BranchID		nvarchar(20),
	@NewBranchName	nvarchar(50),
	@_NewAddress	nvarchar(50)
as
begin
	update BRANCH
	set BranchName = ISNULL(@NewBranchName, BranchName),
		_Address = ISNULL(@_NewAddress, _Address)
	where 
		BranchID = @BranchID
end

exec EditBranch
	@BranchID = N'TD001',
	@NewBranchName = N'Thu Duc 01',
	@_NewAddress = N'Le Van Viet'

--COURT

select * from COURT

go

create procedure AddCourt
	@CourtID	nvarchar(20),
	@CourtName	nvarchar(50),
	@_Status	nvarchar(30),
	@StartDate	varchar(50),
	@BranchID	nvarchar(20)
as
begin
	insert into COURT values (
		@CourtID,
		@CourtName,
		@_Status,
		convert(datetime, @StartDate),
		@BranchID
	)
end

go

exec AddCourt
	@CourtID = N'STD001',
	@CourtName = N'San TD 1',
	@_Status = N'Disable',
	@StartDate = '2023-11-11 21:00:00',
	@BranchID = N'TD001'

go

create procedure EditCourt
	@CourtID		nvarchar(20),
	@NewCourtName	nvarchar(50),
	@_NewStatus		nvarchar(30),
	@NewStartDate	varchar(50),
	@NewBranchID	nvarchar(20)
as
begin
	update COURT
	set
		CourtName = ISNULL(@NewCourtName, CourtName),
		_Status = ISNULL(@_NewStatus, _Status),
		StartDate = ISNULL(convert(datetime, @NewStartDate), StartDate),
		BranchID = ISNuLL(@NewBranchID, BranchID)
	where
		CourtID = @CourtID
end

go

exec EditCourt
	@CourtID = N'STD001',
	@NewCourtName = N'Sân Thủ Đức 01',
	@_NewStatus = N'Using',
	@NewStartDate = null,
	@NewBranchID = null

--SERVICE

select * from _SERVICE

go

create procedure AddService
	@ServiceID		nvarchar(20),
	@ServiceName	nvarchar(100),
	@Unit			nvarchar(20),
	@Price			decimal,
	@Quantity		int,
	@_Status		varchar(30)
as
begin
	insert into _SERVICE values (
		@ServiceID,
		@ServiceName,
		@Unit,
		@Price,
		@Quantity,
		@_Status
	)
end

go

exec AddService 
	@ServiceID = N'SV09',
	@ServiceName = N'Thue vot',
	@Unit = N'cai',
	@Price = 300000,
	@Quantity = 10,
	@_Status = 'Enabled'

go

create procedure EditService
	@ServiceID		nvarchar(20),
	@NewServiceName	nvarchar(100),
	@NewUnit		nvarchar(20),
	@NewPrice		decimal,
	@NewQuantity	int,
	@_NewStatus		varchar(30)
as
begin
	update _SERVICE
	set 
		ServiceName = ISNULL(@NewServiceName, ServiceName),
		Unit = ISNULL(@NewUnit, Unit),
		Price = ISNULL(@NewPrice, Price),
		Quantity = ISNULL(@NewQuantity, Quantity),
		_Status = ISNULL(@_NewStatus, _Status)
	where 
		ServiceID = @ServiceID
end

go

exec EditService
	@ServiceID = N'SV09',
	@NewServiceName = N'Thue vot',
	@NewUnit = N'cai',
	@NewPrice = 30000,
	@NewQuantity = 10,
	@_NewStatus = 'Enabled'

go

create procedure ChangeServiceQuantity
	@ServiceID		nvarchar(20),
	@NewQuantity	int
as
begin
	update _SERVICE
	set
		Quantity = @NewQuantity
	where
		ServiceID = @ServiceID
end

go

exec ChangeServiceQuantity
	@ServiceID = N'SV09',
	@NewQuantity = 9

--SERVICE_RECEIPT

go

create procedure AddServiceReceipt
	@ServiceReceiptNo	nvarchar(20),
	@CreateDate			varchar(50),
	@Total				decimal,
	@PhoneNumber		varchar(13),
	@Username			nvarchar(50)
as
begin
	insert into SERVICE_RECEIPT values (
		@ServiceReceiptNo,
		convert(datetime, @CreateDate),
		@Total,
		@PhoneNumber,
		@Username
	)
end

go

select * from SERVICE_RECEIPT

insert into SERVICE_RECEIPT values (N'Ser1203230000', CONVERT(datetime ,'17-01-23 10:34:09 AM',5 ), 30000, '0337514097', 'staff',N'Chuyển khoản')

exec AddServiceReceipt
	@ServiceReceiptNo = N'Ser1203230001',
	@CreateDate = '2023-11-11 21:00:00',
	@Total = 100000,
	@PhoneNumber = '0823123123',
	@Username = N'customerapp'

go

create procedure EditServiceReceipt
	@ServiceReceiptNo	nvarchar(20),
	@NewCreateDate		varchar(50),
	@NewTotal			decimal,
	@NewPhoneNumber		varchar(13),
	@NewUsername		nvarchar(50)	
as
begin
	update SERVICE_RECEIPT
	set
		CreateDate = ISNULL(@NewCreateDate, CreateDate),
		Total = ISNULL(@NewTotal, Total),
		PhoneNumber = ISNULL(@NewPhoneNumber, PhoneNumber),
		Username = ISNULL(@NewUsername, Username)
	where
		ServiceReceiptNo = @ServiceReceiptNo
end

go

exec EditServiceReceipt
	@ServiceReceiptNo = N'Ser1203230001',
	@NewCreateDate = '2023-11-11 23:00:00',
	@NewTotal = null,
	@NewPhoneNumber = '0823123123',
	@NewUsername = N'customerapp'

--SERVICE_DETAIL

go

select * from SERVICE_DETAIL

go


create procedure AddServiceDetail
	@ServiceReceiptNo	nvarchar(20),
	@ServiceID			nvarchar(20),
	@Quantity			int
as
begin
	insert into SERVICE_DETAIL values (
		@ServiceReceiptNo,
		@ServiceID,
		@Quantity
	)

	exec UpdateServiceReceiptTotal
		@ServiceReceiptNo = @ServiceReceiptNo
end

go

exec AddServiceDetail
	@ServiceReceiptNo = N'Ser1203230001',
	@ServiceID = N'SV01',
	@Quantity = 10

go

create procedure UpdateServiceReceiptTotal 
	@ServiceReceiptNo	nvarchar(20)
as
begin
	update SERVICE_RECEIPT
	set
		Total = (select sum(D.Total)
				from (select SD.ServiceReceiptNo, (S.Price * SD.Quantity) as Total
					from _SERVICE S, SERVICE_DETAIL SD
					where S.ServiceID = SD.ServiceID
					group by SD.ServiceReceiptNo, S.Price, SD.Quantity) D
				where D.ServiceReceiptNo = @ServiceReceiptNo)
	where ServiceReceiptNo = @ServiceReceiptNo
end

exec UpdateServiceReceiptTotal
	@ServiceReceiptNo = N'Ser1203230001'


go

create procedure EditServiceDetail
	@ServiceReceiptNo	nvarchar(20),
	@NewServiceID		nvarchar(20),
	@NewQuantity		int
as
begin
	update SERVICE_DETAIL
	set 
		ServiceID = @NewServiceID,
		Quantity = ISNULL(@NewQuantity, Quantity)
	where 
		ServiceReceiptNo = @ServiceReceiptNo and
		ServiceID = @NewServiceID

	exec UpdateServiceReceiptTotal
		@ServiceReceiptNo = @ServiceReceiptNo
end

go

exec EditServiceDetail 
	@ServiceReceiptNo = N'Ser1203230001',
	@NewServiceID = N'SV09',
	@NewQuantity = 0

--RF_DETAIL

select * from RF_DETAIL

go

create procedure AddRFDetail
	@ReservationNo	nvarchar(20),
	@CourtID		nvarchar(20),
	@Note			nvarchar(255)
as
begin
	insert into RF_Detail values (
		@ReservationNo,
		@CourtID,
		@Note
	)
end

select * from RESERVATION

exec AddRFDetail
	@ReservationNo = N'Rev1011230001',
	@CourtID = N'SBT009',
	@Note = null

go

create procedure EditRFDetailNote
	@ReservationNo	nvarchar(20),
	@CourtID		nvarchar(20),
	@NewNote		nvarchar(255)
as
begin
	update RF_Detail
	set
		Note = ISNULL(@NewNote, Note)
	where 
		ReservationNo = @ReservationNo and
		CourtID = @CourtID
end

exec EditRFDetailNote
	@ReservationNo = N'Rev1011230001',
	@CourtID = N'STD001',
	@NewNote = N'New note'

go

create procedure DelCourtInRFDetail
	@ReservationNo  nvarchar(20),
	@CourtID		nvarchar(20)
as
begin
	delete from RF_Detail
	where 
		ReservationNo = @ReservationNo and
		CourtID = @CourtID
end

exec DelCourtInRFDetail
	@ReservationNo = N'Rev0710230010',
	@CourtID = N'SBT009'

--RECEIPT

select * from RECEIPT

select * from RESERVATION

go

create procedure AddReceipt 
	@ReceiptNo		nvarchar(20),
	@_Date			varchar(50),
	@ExtraTime		float,
	@ReservationNo	nvarchar(20),
	@Username		nvarchar(50),
	@Payment		nvarchar(50)
as
begin
	insert into RECEIPT values (
		@ReceiptNo,
		convert(datetime, @_Date),
		0,
		@ExtraTime,
		@ReservationNo,
		@Username,
		@Payment
	)

	exec UpdateReceiptTotal
		@RN = @ReservationNo,
		@ExtraTime = @ExtraTime
end

go

delete from RECEIPT
where ReceiptNo = N'Rec071023011'

exec AddReceipt
	@ReceiptNo = N'Rec071023011',
	@_Date = '2023-11-11 23:00:00',
	@ExtraTime = 0,
	@ReservationNo = N'Rev1011230001',
	@Username = N'customerapp',
	@Payment = N'Tien mat'

go

drop procedure UpdateReceiptTotal

go

create procedure UpdateReceiptTotal
	@RN	nvarchar(20),
	@ExtraTime	float
as
begin
	update RECEIPT
	set
		Total = (select Total 
				from (select R.ReservationNo, (P.PriceTag * (SELECT (DATEDIFF(SECOND, R.StartTime, R.EndTime) / 3600.0 ) AS SoGio) - R.Deposite + P.PriceTag * @ExtraTime) as Total
						from RESERVATION R, PRICE P
						where R.PriceID = P.PriceID
						group by R.ReservationNo, P.PriceTag, R.EndTime, R.StartTime, R.Deposite) R
				where @RN = R.ReservationNo)
	where ReservationNo = @RN
end

go

create procedure EditReceipt
	@ReceiptNo		nvarchar(20),
	@_NewDate			varchar(50),
	@NewExtraTime		float,
	@NewReservationNo	nvarchar(20),
	@NewUsername		nvarchar(50),
	@NewPayment		nvarchar(50)
as
begin
	update RECEIPT
	set
		_Date = ISNULL(@_NewDate, _Date),
		ExtraTime = ISNULL(@NewExtraTime, ExtraTime),
		ReservationNo = ISNULL(@NewReservationNo, ReservationNo),
		Username = ISNULL(@NewUsername, Username),
		Payment = ISNULL(@NewPayment, Payment)
	where
		ReceiptNo = @ReceiptNo

	exec UpdateReceiptTotal
		@RN = @NewReservationNo,
		@ExtraTime = @NewExtraTime
end

go

exec EditReceipt
	@ReceiptNo = N'Rec071023011',
	@_NewDate = '2023-11-11 23:00:00',
	@NewExtraTime = 1.5,
	@NewReservationNo = N'Rev1011230001',
	@NewUsername = N'customerapp',
	@NewPayment = N'Tien mat'



select * from RESERVATION

select * from PRICE

select * from RECEIPT