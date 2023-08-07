"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    room_type: {
        type: [String],
        required: true,
    },
    room_availibility: {
        type: [
            {
                room_type: String,
                rooms: [Number],
                no_guests: String,
                base_price: String,
            },
        ]
    },
    user_id: {
        type: String,
        required: true,
    },
    chargeble_service: {
        type: [String],
    },
    Amenities: [{
            nameof_amenities: {
                type: String,
                required: true
            },
            types: {
                type: [String],
                required: true
            }
        }],
    photos: {
        type: [
            {
                name: String,
                path: String,
            },
        ],
    },
}, {
    timestamps: true,
});
const RoomModel = (0, mongoose_1.model)('hotelRoomAvailivilitys', RoomSchema);
exports.default = RoomModel;
