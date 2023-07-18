"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HotelDetailsSchema = new mongoose_1.Schema({
    hotelname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    GSTIN: {
        type: String,
        required: true,
    },
    logopath: {
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const HoteldataModel = (0, mongoose_1.model)('HoteldataModel', HotelDetailsSchema);
exports.default = HoteldataModel;
