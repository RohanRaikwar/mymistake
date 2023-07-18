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
exports.chooseveridpocs = exports.hoteldatavari = void 0;
const hotelvari_model_1 = __importDefault(require("../Model/hotelvari.model"));
const hotel_model_1 = __importDefault(require("../Model/hotel.model"));
const joi_1 = __importDefault(require("joi"));
const hoteldatavari = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pancard, GSTcertificate, bankaccount, id } = req.body;
    const imageSchema = joi_1.default.object({
        pancard: joi_1.default.string()
            .trim()
            .required()
            .regex(/^data:image\/(png|jpeg|jpg);base64,/)
            .message('Invalid Base64 image format')
            .max(1024 * 1024) // Maximum file size of 5MB
            .message('Image size exceeds the limit'),
        GSTcertificate: joi_1.default.string()
            .trim()
            .required()
            .regex(/^data:image\/(png|jpeg|jpg);base64,/)
            .message('Invalid Base64 image format')
            .max(1024 * 1024) // Maximum file size of 5MB
            .message('Image size exceeds the limit'),
        bankaccount: joi_1.default.string()
            .trim()
            .required()
            .regex(/^data:image\/(png|jpeg|jpg);base64,/)
            .message('Invalid Base64 image format')
            .max(1024 * 1024) // Maximum file size of 5MB
            .message('Image size exceeds the limit'),
    });
    try {
        const validate = yield imageSchema.validateAsync({ pancard: pancard, GSTcertificate: GSTcertificate, bankaccount: bankaccount });
    }
    catch (err) {
        const message = err.details[0];
        return res.status(400).json(message);
    }
    const updateStage = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "varification docs upload" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt ");
    if (!updateStage) {
        return res.status(500).send("internal error");
    }
    const addData = new hotelvari_model_1.default({ pancard: pancard, GSTcertificate: GSTcertificate, bankaccount: bankaccount, user_id: id });
    const saveData = yield addData.save();
    res.status(201).json(updateStage);
});
exports.hoteldatavari = hoteldatavari;
const chooseveridpocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typedocs, varification_image, id } = req.body;
    console.log(req.body);
    const Schema = joi_1.default.object({
        typedocs: joi_1.default.string().required().regex(/^(Cancelled Cheque|Passbook|Bank Account Statement)$/),
        varification_image: joi_1.default.string()
            .trim()
            .required()
            .regex(/^data:image\/(png|jpeg|jpg);base64,/)
            .message('Invalid Base64 image format')
            .max(1024 * 1024) // Maximum file size of 5MB
            .message('Image size exceeds the limit'),
    });
    try {
        const validate = yield Schema.validateAsync({ typedocs: typedocs, varification_image: varification_image });
    }
    catch (err) {
        return res.status(400).json({ "message": "Invalid base64 image format" });
    }
    const updateUser = yield hotel_model_1.default.findByIdAndUpdate(id, { completedstage: "typeof vari docs uploaded" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");
    if (!updateUser) {
        return res.status(500).send("internal error");
    }
    const uploadVari = yield hotelvari_model_1.default.findOneAndUpdate({ user_id: id }, { typedocs: typedocs, varification_image: varification_image }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");
    res.status(201).json(updateUser);
});
exports.chooseveridpocs = chooseveridpocs;
exports.default = { hoteldatavari: exports.hoteldatavari, chooseveridpocs: exports.chooseveridpocs };
