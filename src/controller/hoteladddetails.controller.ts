import { Request, Response } from 'express';
import Joi from 'joi';
import HotelDetails from '../Model/hotel.details';
import HotelAuth from '../Model/hotel.model';

export const hoteladddetails = async (req: Request, res: Response) => {
  const { hotelname, email, contact, city, address, GSTIN, logopath, id } = req.body;

  const Schema = Joi.object({
    hotelname: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
    contact: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid mobile number format",
        "any.required": "Mobile number is required",
      }),
    city: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .min(3)
      .max(30)
      .required(),
    address: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .min(3)
      .max(50)
      .required(),
    GSTIN: Joi.string()
      .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid GSTIN format",
        "any.required": "GSTIN is required",
      }),
  });

  try {
    await Schema.validateAsync({
      hotelname: hotelname,
      email: email,
      contact: contact,
      city: city,
      address: address,
      GSTIN: GSTIN,
    });
  } catch (err) {
    return res.status(400).json(err);
  }

  const findUser = await HotelAuth.findByIdAndUpdate(id, { completedstage: "contact details filled", "userverify": true }, { returnOriginal: false });
  console.log(findUser);

  const dataSave = new HotelDetails({
    hotelname: hotelname,
    email: email,
    contact: contact,
    city: city,
    address: address,
    GSTIN: GSTIN,
    logopath: logopath,
    user_id: id,
  });

  const saved = await dataSave.save();

  if (!saved) {
    return res.status(500).json({ err: "internal error" });
  }

  res.status(201).json(findUser);
};

export default { hoteladddetails: hoteladddetails };
