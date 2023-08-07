"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HotelVaridocxSchema = new mongoose_1.Schema({
    pancard: {
        type: String,
        required: true,
    },
    GSTcertificate: {
        type: String,
        required: true,
    },
    bankaccount: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    typedocs: {
        type: String,
        default: '',
    },
    varification_image: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});
const hotelvaridocx = (0, mongoose_1.model)('hotelsVarificationDocument', HotelVaridocxSchema);
exports.default = hotelvaridocx;
