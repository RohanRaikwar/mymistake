"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_controller_1 = require("../controller/auth.controller");
router.post("/login", auth_controller_1.login);
router.post("/signup", auth_controller_1.signup);
router.post("/login/otp", auth_controller_1.loginotp);
router.post("/signup/otp", auth_controller_1.signupotp);
router.post("/reset/otp", auth_controller_1.resetotp);
exports.default = router;
