"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModel = void 0;
var mongoose_1 = require("mongoose");
var Hotel = new mongoose_1.Schema({
    mobile_no: {
        required: true,
        type: Number,
        maxlength: 10,
        unique: true
    },
    otp: {
        type: Number,
        maxlength: 4,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    completedstage: {
        type: String,
        required: true,
        default: "not verify"
    },
    userverify: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
});
exports.HotelModel = (0, mongoose_1.model)("HotelModel", Hotel);
