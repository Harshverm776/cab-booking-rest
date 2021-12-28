const vehicleController = require('../../../controllers/vehicle.controller');
const Vehicle = require('../../../models/vehicle.model');
const httpMocks = require('node-mocks-http');
const vehicleReq = require('../mock-data/vehicle-req.json');
const vehicleRes = require('../mock-data/vehicle-res.json');
const allVehicle = require('../mock-data/all-vehicle.json');

Vehicle.create = jest.fn();
Vehicle.find = jest.fn();

let req, res;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("vehicleController.createVehicle", () => {

    beforeEach(() => {
        req.body = vehicleReq;
    });

    it("should have a createVehicle function", () => {
        expect(typeof vehicleController.createVehicle).toBe("function");
    });
    it("should call Vehicle.create", () => {
        vehicleController.createVehicle(req, res);
        expect(Vehicle.create).toBeCalledWith(req.body);
    });
    it("should return 201 response code", async() => {
        await vehicleController.createVehicle(req, res);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async() => {
        Vehicle.create.mockReturnValue(vehicleRes);
        await vehicleController.createVehicle(req, res);
        expect(res._getJSONData()).toStrictEqual(vehicleRes);
    });
    it("should handle error in createVehicle", async() => {
        const message = { message: "Some Error" };
        const rejectedPromise = Promise.reject(message);
        Vehicle.create.mockReturnValue(rejectedPromise);
        await vehicleController.createVehicle(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(message);
    });
});

describe("vehicleController.getVehicle", () => {
    it("should have getVehicle function", () => {
        expect(typeof vehicleController.getVehicle).toBe("function");
    });
    it("should call Vehicle.find()", async() => {
        await vehicleController.getVehicle(req, res);
        expect(Vehicle.find).toHaveBeenCalledWith();
    });
    it("should return response with status 200 and all vehicles", async() => {
        Vehicle.find.mockReturnValue(allVehicle);
        await vehicleController.getVehicle(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allVehicle);
    });
    it("should handle error in getVehicle", async() => {
        const message = { message: "Some Error" };
        const rejectedPromise = Promise.reject(message);
        Vehicle.find.mockReturnValue(rejectedPromise);
        await vehicleController.getVehicle(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(message);
    });
});