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


