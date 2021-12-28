const bookingController = require('../../../controllers/booking.controller');
const Booking = require('../../../models/booking.model');
const Vehicle = require('../../../models/vehicle.model');

const httpMocks = require('node-mocks-http');

const allBooking = require('../mock-data/all-booking.json');
const bookingVin = require('../mock-data/booking-vin.json');
const bookingDate = require('../mock-data/booking-date.json');
const bookingReq = require('../mock-data/booking-req.json');
const bookingRes = require('../mock-data/booking-res.json');
const bookingReqCap = require('../mock-data/booking-req-cap.json');

const vehicle = require('../mock-data/vehicle.json');

Booking.find = jest.fn();
Vehicle.find = jest.fn();
Booking.create = jest.fn();

let req, res;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("bookingController.createVehicle", () => {
    beforeEach(() => {
        req.body = bookingReq;
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2021, 10, 25, 10, 0, 0, 0));
    });

    it("should have a createBooking function", () => {
        expect(typeof bookingController.createBooking).toBe("function");
    });
    it("should call Vehicle.find", () => {
        bookingController.createBooking(req, res);
        expect(Vehicle.find).toBeCalledWith({ "vehicle.vin": "12345678901234569" });
    });
    it("should return 201 response code", async() => {
        Vehicle.find.mockReturnValue(vehicle);
        Booking.create.mockReturnValue(bookingRes);
        await bookingController.createBooking(req, res);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async() => {
        Vehicle.find.mockReturnValue(vehicle);
        Booking.create.mockReturnValue(bookingRes);
        await bookingController.createBooking(req, res);
        expect(res._getJSONData()).toStrictEqual(bookingRes);
    });
    it("should handle error in createVehicle", async() => {
        const message = { message: "Some Error" };
        const rejectedPromise = Promise.reject(message);
        Vehicle.find.mockReturnValue(rejectedPromise);
        await bookingController.createBooking(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(message);
    });
    it("should return 200 response code and message if capacity exceed", async() => {
        req.body = bookingReqCap;
        Vehicle.find.mockReturnValue(vehicle);
        await bookingController.createBooking(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        const message = { "message": "Booking capacity is 6" };
        expect(res._getJSONData()).toStrictEqual(message);
    });
    it("should return 200 response code and message if not in working hours", async() => {
        jest.setSystemTime(new Date(2021, 10, 25, 8, 0, 0, 0));
        Vehicle.find.mockReturnValue(vehicle);
        await bookingController.createBooking(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        const message = { message: "Booking is only open from 9 AM to 5 PM" };
        expect(res._getJSONData()).toStrictEqual(message);
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});

describe("bookingController.getBooking", () => {
    it("should have getBooking function", () => {
        expect(typeof bookingController.getBooking).toBe("function");
    });
    it("should call Booking.find()", async() => {
        await bookingController.getBooking(req, res);
        expect(Booking.find).toHaveBeenCalledWith();
    });
    it("should return response with status 200 and all booking", async() => {
        Booking.find.mockReturnValue(allBooking);
        await bookingController.getBooking(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allBooking);
    });
    it("should handle error in getBooking", async() => {
        const message = { message: "Some Error" };
        const rejectedPromise = Promise.reject(message);
        Booking.find.mockReturnValue(rejectedPromise);
        await bookingController.getBooking(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(message);
    });
});

describe("bookingController.getBookingByVin", () => {

    it("should have getBookingByVin function", () => {
        expect(typeof bookingController.getBookingByVin).toBe("function");
    });
    it("should call Booking.find()", async() => {
        req.params.vin = "12345678901234567";
        await bookingController.getBookingByVin(req, res);
        expect(Booking.find).toHaveBeenCalledWith({ "vehicle.vin": req.params.vin });
    });
    it("should return response with status 200 and all booking", async() => {
        Booking.find.mockReturnValue(bookingVin);
        await bookingController.getBookingByVin(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(bookingVin);
    });
    it("should handle error in getBookingByVin", async() => {
        const message = { message: "Some Error" };
        const rejectedPromise = Promise.reject(message);
        Booking.find.mockReturnValue(rejectedPromise);
        await bookingController.getBookingByVin(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(message);
    });
});

describe("bookingController.getBookingByDate", () => {

    it("should have getBookingByDate function", () => {
        expect(typeof bookingController.getBookingByDate).toBe("function");
    });
    it("should call Booking.find()", async() => {
        await bookingController.getBookingByDate(req, res);
        expect(Booking.find).toHaveBeenCalledWith();
    });
    it("should return response with status 200 and all booking", async() => {
        req.params.date = "2021-11-21";
        Booking.find.mockReturnValue(allBooking);
        await bookingController.getBookingByDate(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(bookingDate);
    });
    it("should handle error in getBookingByDate", async() => {
        const message = { message: "Some Error" };
        const rejectedPromise = Promise.reject(message);
        Booking.find.mockReturnValue(rejectedPromise);
        await bookingController.getBookingByDate(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(message);
    });
});