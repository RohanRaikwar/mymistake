"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_connect_1 = __importDefault(require("./config/db.connect"));
var bodyparser = require('body-parser');
var auth_routs_1 = __importDefault(require("./Router/auth.routs"));
var app = (0, express_1.default)();
var port = 5000;
(0, db_connect_1.default)();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/auth/api", auth_routs_1.default);
app.listen(port, function () {
    return console.log("Express is listenng at http://localhost:".concat(port));
});
