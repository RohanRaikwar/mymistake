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
exports.resetotp = exports.signup = exports.loginotp = exports.signupotp = exports.login = void 0;
const opt_genrater_1 = __importDefault(require("../service/opt.genrater"));
const jwt_genrater_1 = __importDefault(require("../service/jwt.genrater"));
const joi_1 = __importDefault(require("joi"));
const hotel_model_1 = __importDefault(require("../Model/hotel.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_no, otp } = req.body;
    console.log(req.body);
    const Schema = joi_1.default.object({
        number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        otp: joi_1.default.string().regex(/^[0-9]{4}$/).messages({ 'string.pattern.base': `otp must have 4 digits.` }).required()
    });
    try {
        const parser = yield Schema.validateAsync({ number: mobile_no, otp: otp });
        console.log(parser);
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "bad request" });
    }
    const otpRegen = yield (0, opt_genrater_1.default)();
    const checkExit = yield hotel_model_1.default.findOne({ mobile_no: mobile_no, userverify: "true" }).select('-__v -createdAt -updatedAt');
    if (!checkExit) {
        return res.status(401).json({ message: "user not found" });
    }
    console.log(checkExit);
    if (checkExit.otp != otp) {
        return res.status(401).json({ message: "invalid otp" });
    }
    const updateOtp = yield hotel_model_1.default.findOneAndUpdate({ mobile_no: mobile_no }, { otp: otpRegen }).select('-__v -otp -createdAt -updatedAt');
    if (!updateOtp) {
        return res.status(500).send("internal error");
    }
    const token = yield (0, jwt_genrater_1.default)(updateOtp.id);
    res.status(200).json({ data: updateOtp, token: token });
});
exports.login = login;
const signupotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mobile_no = req.body.mobile_no;
    const Schema = joi_1.default.object({
        number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
    });
    try {
        const value = yield Schema.validateAsync({ number: mobile_no });
    }
    catch (err) {
        return res.status(401).json("invalid Mobile number");
    }
    try {
        const data = yield hotel_model_1.default.findOne({ mobile_no: mobile_no });
        if (data) {
            return res.status(403).json("user already exists");
        }
    }
    catch (err) {
        return res.json(err);
    }
    const otp = yield (0, opt_genrater_1.default)();
    const addData = new hotel_model_1.default({ mobile_no: mobile_no, otp: otp });
    const saveUser = yield addData.save();
    res.status(201).json({ message: `your otp has been sent to ${saveUser.mobile_no}` });
});
exports.signupotp = signupotp;
const loginotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mobile_no = req.body.mobile_no;
    const Schema = joi_1.default.object({
        number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
    });
    try {
        const numbervaliation = yield Schema.validateAsync({ number: mobile_no });
    }
    catch (err) {
        return res.status(401).send("invalid number");
    }
    const userData = yield hotel_model_1.default.findOne({ mobile_no: mobile_no, userverify: true });
    if (!userData) {
        return res.status(404).json("user not found");
    }
    res.status(200).json({ message: `your otp has been sent to ${userData.mobile_no}` });
});
exports.loginotp = loginotp;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_no, otp } = req.body;
    const Schema = joi_1.default.object({
        number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        otp: joi_1.default.string().regex(/^[0-9]{4}$/).messages({ 'string.pattern.base': `otp must have 4 digits.` }).required()
    });
    try {
        const validater = yield Schema.validateAsync({ number: mobile_no, otp: otp });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
    const otpRegen = yield (0, opt_genrater_1.default)();
    try {
        const userData = yield hotel_model_1.default.findOne({ mobile_no: mobile_no, userverify: "false" });
        console.log(userData);
        if (!userData) {
            return res.status(404).json("user not found");
        }
        if (userData.otp != otp) {
            return res.status(401).json({ message: "invalid otp" });
        }
    }
    catch (err) {
        return res.status(404).json({ message: "internal error" });
    }
    const updateData = yield hotel_model_1.default.findOneAndUpdate({ mobile_no: mobile_no }, { userverify: true, otp: otpRegen, completedstage: "login" }, { returnOriginal: false }).select('-__v -otp -createdAt -updatedAt');
    const token = yield (0, jwt_genrater_1.default)(updateData.id);
    res.status(200).json({ data: updateData, token: token });
});
exports.signup = signup;
const resetotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mobile_no = req.body.mobile_no;
    const Schema = joi_1.default.object({
        number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
    });
    try {
        const numbervaliation = yield Schema.validateAsync({ number: mobile_no });
    }
    catch (err) {
        return res.status(401).json({ message: "invalid mobile number" });
    }
    const userData = yield hotel_model_1.default.findOne({ mobile_no: mobile_no });
    if (!userData) {
        return res.status(404).json({ message: "user not found" });
    }
    const otpRegen = yield (0, opt_genrater_1.default)();
    const updateOtp = yield hotel_model_1.default.findOneAndUpdate({ mobile_no: mobile_no }, { otp: otpRegen });
    res.status(202).json({ message: `otp resend on ${updateOtp.mobile_no}` });
});
exports.resetotp = resetotp;
