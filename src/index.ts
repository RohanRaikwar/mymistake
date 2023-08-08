import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/db.connect';
import authRoutes from './Router/auth.routes';
import hotelformRoutes from './Router/hotelform.routes';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { any } from 'joi';

const app = express();
const port = 5000;

connectDB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use("/public",express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join( 'public/'));
      },
      filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded image
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      },
});

const upload = multer({ storage: storage });

app.use(cors());

app.use("/auth/api", authRoutes);
app.use("/api/hoteldata", hotelformRoutes);

app.post("/logoupload", upload.single('file'), (req: any, res: Response) => {
   
    
   
    res.send(path.join("https://revivohotelmanagment-service.onrender.com/", "public", `${req.file.filename}`));
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
