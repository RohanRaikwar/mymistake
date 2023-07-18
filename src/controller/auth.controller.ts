import { Request, Response } from 'express';
import otpgen from '../service/opt.genrater';
import jwtgenrater from '../service/jwt.genrater';
import Joi from 'joi';
import HotelAuth from "../Model/hotel.model"

export const login = async (req: Request, res: Response) => {
  const { mobile_no, otp } = req.body;

  const Schema = Joi.object({
    number: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    otp: Joi.string().regex(/^[0-9]{4}$/).messages({ 'string.pattern.base': `otp must have 4 digits.` }).required()
  });

  try {
    const parser = await Schema.validateAsync({ number: mobile_no, otp: otp });
  } catch (err) {
    return res.status(404).json({ message: "invalid mobile number" });
  }

  const otpRegen = await otpgen();
  const checkExit = await HotelAuth.findOne({ mobile_no: mobile_no, userverify: "true" }).select('-__v -createdAt -updatedAt');

  if (!checkExit) {
    return res.status(401).json({ message: "user not found" });
  }

  if (checkExit.otp !== otp) {
    return res.status(401).json({ message: "invalid otp" });
  }

  const updateOtp = await HotelAuth.findOneAndUpdate({ mobile_no: mobile_no }, { otp: otpRegen }).select('-__v -otp -createdAt -updatedAt');

  if (!updateOtp) {
    return res.status(500).send("internal error");
  }

  const token = await jwtgenrater(updateOtp.id);
  res.status(200).json({ data: updateOtp, token: token });
};

export const signupotp = async (req: Request, res: Response) => {
  const mobile_no = req.body.mobile_no;

  const Schema = Joi.object({
    number: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
  });

  try {
    const value = await Schema.validateAsync({ number: mobile_no });
  } catch (err) {
    return res.status(401).json("invalid Mobile number");
  }

  try {
    const data = await HotelAuth.findOne({ mobile_no: mobile_no });

    if (data) {
      return res.status(403).json("user already exists");
    }
  } catch (err) {
    return res.json(err);
  }

  const otp = await otpgen();
  const addData = new HotelAuth({ mobile_no: mobile_no, otp: otp });
  const saveUser = await addData.save();
  res.status(201).json({ message: `your otp has been sent to ${saveUser.mobile_no}` });
};

export const loginotp = async (req: Request, res: Response) => {
  const mobile_no = req.body.mobile_no;

  const Schema = Joi.object({
    number: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
  });

  try {
    const numbervaliation = await Schema.validateAsync({ number: mobile_no });
  } catch (err) {
    return res.status(401).send("invalid number");
  }

  const userData = await HotelAuth.findOne({ mobile_no: mobile_no, userverify: true });

  if (!userData) {
    return res.status(404).json("user not found");
  }

  res.status(200).json({ message: `your otp has been sent to ${userData.mobile_no}` });
};

export const signup = async (req: Request, res: Response) => {
  const { mobile_no, otp } = req.body;

  const Schema = Joi.object({
    number: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    otp: Joi.string().regex(/^[0-9]{4}$/).messages({ 'string.pattern.base': `otp must have 4 digits.` }).required()
  });

  try {
    const validater = await Schema.validateAsync({ number: mobile_no, otp: otp });
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  const otpRegen = await otpgen();

  try {
    const userData = await HotelAuth.findOne({ mobile_no: mobile_no, userverify: "false" });
    console.log(userData);
    

    if (!userData) {
      return res.status(404).json("user not found");
    }

    if (userData.otp != otp) {
      return res.status(401).json({ message: "invalid otp" });
    }
  } catch (err) {
    return res.status(404).json({ message: "internal error" });
  }

  const updateData = await HotelAuth.findOneAndUpdate({ mobile_no: mobile_no }, { userverify: true, otp: otpRegen, completedstage: "login" }, { returnOriginal: false }).select('-__v -otp -createdAt -updatedAt');
  const token = await jwtgenrater(updateData.id);
  res.status(200).json({ data: updateData, token: token });
};

export const resetotp = async (req: Request, res: Response) => {
  const mobile_no = req.body.mobile_no;

  const Schema = Joi.object({
    number: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
  });

  try {
    const numbervaliation = await Schema.validateAsync({ number: mobile_no });
  } catch (err) {
    return res.status(401).json({ message: "invalid mobile number" });
  }

  const userData = await HotelAuth.findOne({ mobile_no: mobile_no });

  if (!userData) {
    return res.status(404).json({ message: "user not found" });
  }

  const otpRegen = await otpgen();
  const updateOtp = await HotelAuth.findOneAndUpdate({ mobile_no: mobile_no }, { otp: otpRegen });

  res.status(202).json({ message: `otp resend on ${updateOtp.mobile_no}` });
};
