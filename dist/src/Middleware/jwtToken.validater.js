"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtvelidater = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ massage: "authrizationn required" });
    }
    var puretoken = token.split("")[1];
    var verifytiken = jsonwebtoken_1.default.verify(puretoken, "mysecret");
    if (!verifytiken) {
        return res.status(401).json({ massage: "unutheriezed" });
    }
    var decode = jsonwebtoken_1.default.decode(puretoken);
    console.log(decode.id);
    req.body.id = decode.id;
    next();
};
exports.default = jwtvelidater;
