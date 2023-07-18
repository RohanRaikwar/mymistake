"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hoteladddetails_controller_1 = require("../controller/hoteladddetails.controller");
const jwt_validater_1 = __importDefault(require("../middleware/jwt.validater"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const hotel_varidocs_1 = require("../controller/hotel.varidocs");
const Room_controller_1 = require("../controller/Room.controller");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, 'public', 'images'));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded image
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
// Filter for allowed file types (in this example, only images are allowed)
// Create the Multer upload instance
const upload = (0, multer_1.default)({ storage: storage });
router.post("/details", jwt_validater_1.default, hoteladddetails_controller_1.hoteladddetails);
router.post("/varification/docs/upload", jwt_validater_1.default, hotel_varidocs_1.hoteldatavari);
router.post("/varification/choose/docx", jwt_validater_1.default, hotel_varidocs_1.chooseveridpocs);
router.post("/roomtypes", jwt_validater_1.default, Room_controller_1.roomtypescontroller);
router.post("/room/availibility", jwt_validater_1.default, Room_controller_1.roomavilable);
router.post("/room/service", jwt_validater_1.default, Room_controller_1.addroomservices);
router.post("/room/amenities", jwt_validater_1.default, Room_controller_1.addanmanties);
router.post("/room/upload", jwt_validater_1.default, Room_controller_1.uploadphotos);
exports.default = router;
