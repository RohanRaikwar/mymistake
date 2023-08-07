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
        ],
        default: [{ room_type: '', rooms: [], no_guests: '', base_price: '' }],
    },
    user_id: {
        type: String,
        required: true,
    },
    chargeble_service: {
        type: [String],
        default: ['housekeeping', 'spa'],
    },
    Amenities: {
        type: [
            {
                nameof_amenities: String,
                types: [String],
            },
        ],
        default: [{ nameof_amenities: 'general_amenities', types: [] }],
    },
    photos: {
        type: [
            {
                name: String,
                path: String,
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
const RoomModel = (0, mongoose_1.model)('hotelRoomAvailivilitys', RoomSchema);
exports.default = RoomModel;
