"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connect_1 = __importDefault(require("./config/db.connect"));
const auth_routes_1 = __importDefault(require("./Router/auth.routes"));
const hotelform_routes_1 = __importDefault(require("./Router/hotelform.routes"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
(0, db_connect_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express_1.default.static(path_1.default.join('public/')));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join('public/'));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded image
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.use((0, cors_1.default)());
app.use("/auth/api", auth_routes_1.default);
app.use("/api/hoteldata", hotelform_routes_1.default);
app.post("/logoupload", upload.single('file'), (req, res) => {
    res.send(path_1.default.join("https://revivohotelmanagment-service.onrender.com/", "public", `${req.file.filename}`));
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
