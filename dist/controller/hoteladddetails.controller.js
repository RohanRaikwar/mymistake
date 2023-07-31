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
exports.hoteladddetails = void 0;
const joi_1 = __importDefault(require("joi"));
const hotel_details_1 = __importDefault(require("../Model/hotel.details"));
const hotel_model_1 = __importDefault(require("../Model/hotel.model"));
const hoteladddetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hotelname, email, contact, city, address, GSTIN, logopath, id } = req.body;
    const Schema = joi_1.default.object({
        hotelname: joi_1.default.string()
            .pattern(/^[a-zA-Z ]+$/)
            .min(3)
            .max(30)
            .required(),
        email: joi_1.default.string()
            .email()
            .required()
            .messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required",
        }),
        contact: joi_1.default.string()
            .pattern(/^\d{10}$/)
            .required()
            .messages({
            "string.pattern.base": "Invalid mobile number format",
            "any.required": "Mobile number is required",
        }),
        city: joi_1.default.string()
            .pattern(/^[a-zA-Z]+$/)
            .min(3)
            .max(30)
            .required(),
        address: joi_1.default.string()
            .pattern(/^[a-zA-Z ]+$/)
            .min(3)
            .max(50)
            .required(),
        GSTIN: joi_1.default.string()
            .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/)
            .required()
            .messages({
            "string.pattern.base": "Invalid GSTIN format",
            "any.required": "GSTIN is required",
        }),
    });
    try {
        yield Schema.validateAsync({
            hotelname: hotelname,
            email: email,
            contact: contact,
            city: city,
            address: address,
            GSTIN: GSTIN,
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
    const findUser = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "contact details filled", "userverify": true }, { returnOriginal: false });
    console.log(findUser);
    const dataSave = new hotel_details_1.default({
        hotelname: hotelname,
        email: email,
        contact: contact,
        city: city,
        address: address,
        GSTIN: GSTIN,
        logopath: logopath,
        user_id: id,
    });
    const saved = yield dataSave.save();
    if (!saved) {
        return res.status(500).json({ err: "internal error" });
    }
    res.status(201).json(findUser);
});
exports.hoteladddetails = hoteladddetails;
exports.default = { hoteladddetails: exports.hoteladddetails };
