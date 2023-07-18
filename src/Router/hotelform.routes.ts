import { Router, Request, Response } from 'express';
import { hoteladddetails } from '../controller/hoteladddetails.controller';
import jwtTokenValidater from "../middleware/jwt.validater";
import multer from 'multer';
import path from 'path';
import { hoteldatavari, chooseveridpocs } from '../controller/hotel.varidocs';
import { roomtypescontroller, roomavilable, addroomservices, addanmanties, uploadphotos } from '../controller/Room.controller';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public', 'images'));
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded image
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  // Filter for allowed file types (in this example, only images are allowed)
 
  
  // Create the Multer upload instance
  const upload = multer({ storage: storage });

router.post("/details", jwtTokenValidater, hoteladddetails);
router.post("/varification/docs/upload", jwtTokenValidater, hoteldatavari);
router.post("/varification/choose/docx", jwtTokenValidater, chooseveridpocs);
router.post("/roomtypes", jwtTokenValidater, roomtypescontroller);
router.post("/room/availibility", jwtTokenValidater, roomavilable);
router.post("/room/service", jwtTokenValidater, addroomservices);
router.post("/room/amenities", jwtTokenValidater, addanmanties);
router.post("/room/upload", jwtTokenValidater, uploadphotos);


export default router;
