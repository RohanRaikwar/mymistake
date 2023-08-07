"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadphotos = exports.addanmanties = exports.addroomservices = exports.roomavilable = exports.roomtypescontroller = void 0;
const joi_1 = __importDefault(require("joi"));
const hotel_model_1 = __importDefault(require("../Model/hotel.model"));
const hotelRoome_model_1 = __importDefault(require("../Model/hotelRoome.model"));
const roomtypescontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, id } = req.body;
    console.log(req.body);
    const Schema = joi_1.default.object({
        data: joi_1.default.array()
            .min(1)
            .items(joi_1.default.string())
            .required(),
    });
    try {
        yield Schema.validateAsync({ data: data });
    }
    catch (err) {
        return res.status(400).json("invalide request");
    }
    const checkRoomData = yield hotelRoome_model_1.default.find({ user_id: id });
    console.log(checkRoomData);
    if (checkRoomData.length == 0) {
        const addrooms = new hotelRoome_model_1.default({ room_type: data, user_id: id });
        console.log(addrooms);
        const savedata = yield addrooms.save();
        console.log(11);
    }
    else {
        const userUpadte = yield hotelRoome_model_1.default.findOneAndUpdate({ user_id: id }, { room_type: data });
        console.log("22");
    }
    const updatestage = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "room types uploaded" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");
    res.status(201).json(updatestage);
});
exports.roomtypescontroller = roomtypescontroller;
const roomavilable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const data = req.body.id;
    const sohan = joi_1.default.array().items(joi_1.default.object().keys({
        "room_type": joi_1.default.string().required(),
        "rooms": joi_1.default.array().items(joi_1.default.number()).required(),
        "no_guests": joi_1.default.number().required(),
        "base_price": joi_1.default.number().required()
    })).required();
    try {
        const nn = yield sohan.validateAsync(req.body.data);
        console.log(nn);
    }
    catch (err) {
        return res.status(400).json(err);
    }
    try {
        const updaterooms = yield hotelRoome_model_1.default.findOneAndUpdate({ user_id: data }, { room_availibility: req.body.data });
        console.log(updaterooms);
    }
    catch (err) {
        return res.status(404).json(err);
    }
    const updatestage = yield hotel_model_1.default.findByIdAndUpdate(data, { completedstage: "room avilibility filled" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp");
    res.status(201).json(updatestage);
});
exports.roomavilable = roomavilable;
const addroomservices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chargeble_service, id } = req.body;
    console.log(req.body);
    const Schema = joi_1.default.object().keys({
        chargeble_service: joi_1.default.array().items(joi_1.default.string().regex(/^(Kitchen|Laundry|Spa|Gym|Banquet|Swimming pool|Salon|HouseKeeping)$/).required()).required(),
    });
    try {
        yield Schema.validateAsync(req.body.data);
    }
    catch (err) {
        return res.status(400).json(err);
    }
    try {
        const savedata = yield hotelRoome_model_1.default.findOneAndUpdate({ user_id: id }, { chargeble_service: req.body.chargeble_service });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    const updatestage = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "chargeble_service filled" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt  -otp");
    res.status(201).json(updatestage);
});
exports.addroomservices = addroomservices;
const addanmanties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amenities, id } = req.body;
    console.log(amenities);
    const Schema = joi_1.default.array().items(joi_1.default.object({
        nameof_amenities: joi_1.default.string().required(),
        types: joi_1.default.array().items(joi_1.default.string().required()).required(),
    }));
    try {
        const validater = yield Schema.validateAsync(amenities);
        console.log(validater);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json("invalide request");
    }
    try {
        const update = yield hotelRoome_model_1.default.findOneAndUpdate({ user_id: id }, { Amenities: amenities });
        const updatestage = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "amenities filled" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");
        res.status(201).json(update);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.addanmanties = addanmanties;
const uploadphotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { photos, id } = req.body;
    console.log(id);
    const Schema = joi_1.default.array().items(joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    })).required();
    try {
        yield Schema.validateAsync(req.body.photos);
    }
    catch (err) {
        return res.status(400).json(err);
    }
    const uploadpicture = yield hotelRoome_model_1.default.findOneAndUpdate({ user_id: id }, { photos: photos });
    const updatestage = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "room photo uploded && login steps complete" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt  -otp");
    res.status(201).json(updatestage);
});
exports.uploadphotos = uploadphotos;
exports.default = {
    roomtypescontroller: exports.roomtypescontroller,
    roomavilable: exports.roomavilable,
    addroomservices: exports.addroomservices,
    addanmanties: exports.addanmanties,
    uploadphotos: exports.uploadphotos,
};
