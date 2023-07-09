import express,{Request,Response} from "express";
const router = express.Router()
import {login,signup,loginotp,signupotp,resetotp}  from '../controller/auth.controller'




router.post("/login",login)
router.post("/signup",signup)
router.post("/login/otp",loginotp)
router.post("/signup/otp",signupotp)
router.post("/reset/otp",resetotp)



export default  router