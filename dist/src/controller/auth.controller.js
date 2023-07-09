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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetotp = exports.signup = exports.loginotp = exports.signupotp = exports.login = void 0;
var opt_genrater_1 = __importDefault(require("../service/opt.genrater"));
var jwt_genrater_1 = __importDefault(require("../service/jwt.genrater"));
var joi_1 = __importDefault(require("joi"));
var hotel_auth_1 = require("../model/hotel.auth");
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mobile_no, otp, Schema, parser, err_1, otpregen, checkexit, updateotp, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, mobile_no = _a.mobile_no, otp = _a.otp;
                Schema = joi_1.default.object({
                    number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': "Phone number must have 10 digits." }).required(),
                    otp: joi_1.default.string().regex(/^[0-9]{4}$/).messages({ 'string.pattern.base': "otp must have 4 digits." }).required()
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Schema.validateAsync({ number: mobile_no, otp: otp })];
            case 2:
                parser = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(404).json({ massage: "invalid mobile number" })];
            case 4: return [4 /*yield*/, (0, opt_genrater_1.default)()];
            case 5:
                otpregen = _b.sent();
                return [4 /*yield*/, hotel_auth_1.HotelModel.findOne({ mobile_no: mobile_no, userverify: "true" }).select('-__v -createdAt -updatedAt')];
            case 6:
                checkexit = _b.sent();
                if (!checkexit) {
                    return [2 /*return*/, res.status(401).json({ massage: "user are not found" })];
                }
                if (checkexit.otp != otp) {
                    return [2 /*return*/, res.status(401).json({ massage: "invlide otp" })];
                }
                return [4 /*yield*/, hotel_auth_1.HotelModel.findOneAndUpdate({ mobile_no: mobile_no }, { otp: otpregen }).select('-__v -otp -createdAt -updatedAt')];
            case 7:
                updateotp = _b.sent();
                if (!updateotp) {
                    return [2 /*return*/, res.status(500).send("internal error")];
                }
                return [4 /*yield*/, (0, jwt_genrater_1.default)(updateotp.id)];
            case 8:
                token = _b.sent();
                res.status(200).json({ massage: updateotp, token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var signupotp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mobile_no, Schema, value, err_2, data, err_3, otp, addata, saveuser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mobile_no = req.body.mobile_no;
                Schema = joi_1.default.object({
                    number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': "Phone number must have 10 digits." }).required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Schema.validateAsync({ number: mobile_no })];
            case 2:
                value = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(401).json("invalid Mobile number")];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, hotel_auth_1.HotelModel.findOne({ mobile_no: mobile_no })];
            case 5:
                data = _a.sent();
                if (data) {
                    return [2 /*return*/, res.status(403).json("user are already exit")];
                }
                return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                return [2 /*return*/, res.json(err_3)];
            case 7: return [4 /*yield*/, (0, opt_genrater_1.default)()];
            case 8:
                otp = _a.sent();
                addata = new hotel_auth_1.HotelModel({ mobile_no: mobile_no, otp: otp });
                return [4 /*yield*/, addata.save()];
            case 9:
                saveuser = _a.sent();
                res.status(201).json({ massage: " your otp send on ".concat(saveuser.mobile_no, " ") });
                return [2 /*return*/];
        }
    });
}); };
exports.signupotp = signupotp;
var loginotp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mobile_no, Schema, numbervaliation, err_4, userdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mobile_no = req.body.mobile_no;
                Schema = joi_1.default.object({
                    number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': "Phone number must have 10 digits." }).required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Schema.validateAsync({ number: mobile_no })];
            case 2:
                numbervaliation = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(401).send("invalid number")];
            case 4: return [4 /*yield*/, hotel_auth_1.HotelModel.findOne({ mobile_no: mobile_no, userverify: true })];
            case 5:
                userdata = _a.sent();
                if (!userdata) {
                    return [2 /*return*/, res.status(404).json("user not found")];
                }
                res.status(200).json({ massage: "your otp send on ".concat(userdata.mobile_no) });
                return [2 /*return*/];
        }
    });
}); };
exports.loginotp = loginotp;
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mobile_no, otp, Schema, validater, err_5, otpregen, userdata, err_6, updata, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, mobile_no = _a.mobile_no, otp = _a.otp;
                Schema = joi_1.default.object({
                    number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': "Phone number must have 10 digits." }).required(),
                    otp: joi_1.default.string().regex(/^[0-9]{4}$/).messages({ 'string.pattern.base': "otp must have 4 digits." }).required()
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Schema.validateAsync({ number: mobile_no, otp: otp })];
            case 2:
                validater = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(400).json({ massage: "bad imformation" })];
            case 4: return [4 /*yield*/, (0, opt_genrater_1.default)()];
            case 5:
                otpregen = _b.sent();
                _b.label = 6;
            case 6:
                _b.trys.push([6, 8, , 9]);
                return [4 /*yield*/, hotel_auth_1.HotelModel.findOne({ mobile_no: mobile_no, userverify: "false" })];
            case 7:
                userdata = _b.sent();
                if (!userdata) {
                    return [2 /*return*/, res.status(404).json("user are not found")];
                }
                if (userdata.otp != otp) {
                    return [2 /*return*/, res.status(401).json({ massage: "invalid otp" })];
                }
                return [3 /*break*/, 9];
            case 8:
                err_6 = _b.sent();
                return [2 /*return*/, res.status(404).json({ massage: "intenal err" })];
            case 9: return [4 /*yield*/, hotel_auth_1.HotelModel.findOneAndUpdate({ mobile_no: mobile_no }, { userverify: true, otp: otpregen, completedstage: "login" }, { returnOriginal: false }).select('-__v -otp -createdAt -updatedAt')];
            case 10:
                updata = _b.sent();
                return [4 /*yield*/, (0, jwt_genrater_1.default)(updata.id)];
            case 11:
                token = _b.sent();
                res.status(200).json({ data: updata, token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var resetotp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mobile_no, Schema, numbervaliation, err_7, userdata, otpregen, updateotp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mobile_no = req.body.mobile_no;
                Schema = joi_1.default.object({
                    number: joi_1.default.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': "Phone number must have 10 digits." }).required()
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Schema.validateAsync({ number: mobile_no })];
            case 2:
                numbervaliation = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                return [2 /*return*/, res.status(401).json({ massage: "invlide mobile number" })];
            case 4: return [4 /*yield*/, hotel_auth_1.HotelModel.findOne({ mobile_no: mobile_no })];
            case 5:
                userdata = _a.sent();
                if (!userdata) {
                    return [2 /*return*/, res.status(404).json({ massage: "user are not found" })];
                }
                return [4 /*yield*/, (0, opt_genrater_1.default)()];
            case 6:
                otpregen = _a.sent();
                return [4 /*yield*/, hotel_auth_1.HotelModel.findOneAndUpdate({ mobile_no: mobile_no }, { otp: otpregen })];
            case 7:
                updateotp = _a.sent();
                res.status(202).json({ massage: "otp resend on ".concat(updateotp.mobile_no) });
                return [2 /*return*/];
        }
    });
}); };
exports.resetotp = resetotp;
exports.default = { login: exports.login, signup: exports.signup, loginotp: exports.loginotp, signupotp: exports.signupotp, resetotp: exports.resetotp };
