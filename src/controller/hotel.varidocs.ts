import { Request, Response } from 'express';
import  hotelvaridocx  from '../Model/hotelvari.model';
import HotelAuth from '../Model/hotel.model';
import Joi from 'joi';

export const hoteldatavari = async (req: Request, res: Response) => {
  const { pancard, GSTcertificate, bankaccount, id } = req.body;

  const imageSchema = Joi.object({
    pancard: Joi.string()
      .trim()
      .required()
      .regex(/^data:image\/(png|jpeg|jpg);base64,/)
      .message('Invalid Base64 image format')
      .max(1024 * 1024) // Maximum file size of 5MB
      .message('Image size exceeds the limit'),
    GSTcertificate: Joi.string()
      .trim()
      .required()
      .regex(/^data:image\/(png|jpeg|jpg);base64,/)
      .message('Invalid Base64 image format')
      .max(1024 * 1024) // Maximum file size of 5MB
      .message('Image size exceeds the limit'),
    bankaccount: Joi.string()
      .trim()
      .required()
      .regex(/^data:image\/(png|jpeg|jpg);base64,/)
      .message('Invalid Base64 image format')
      .max(1024 * 1024) // Maximum file size of 5MB
      .message('Image size exceeds the limit'),
  });

  try {
    const validate = await imageSchema.validateAsync({ pancard: pancard, GSTcertificate: GSTcertificate, bankaccount: bankaccount });
  } catch (err) {
    const message = err.details[0];
    return res.status(400).json(message);
  }

  const updateStage = await HotelAuth.findByIdAndUpdate(id, { completedstage: "varification docs upload" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt ");

  if (!updateStage) {
    return res.status(500).send("internal error");
  }

  const addData = new hotelvaridocx({ pancard: pancard, GSTcertificate: GSTcertificate, bankaccount: bankaccount, user_id: id });
  const saveData = await addData.save();

  res.status(201).json(updateStage);
};

export const chooseveridpocs = async (req: Request, res: Response) => {
  const { typedocs, varification_image, id } = req.body;
  console.log(req.body);

  const Schema = Joi.object({
    typedocs: Joi.string().required().regex(/^(Cancelled Cheque|Passbook|Bank Account Statement)$/),
    varification_image: Joi.string()
      .trim()
      .required()
      .regex(/^data:image\/(png|jpeg|jpg);base64,/)
      .message('Invalid Base64 image format')
      .max(1024 * 1024) // Maximum file size of 5MB
      .message('Image size exceeds the limit'),
  });

  try {
    const validate = await Schema.validateAsync({ typedocs: typedocs, varification_image: varification_image });
  } catch (err) {
    return res.status(400).json({ "message": "Invalid base64 image format" });
  }

  const updateUser = await HotelAuth.findByIdAndUpdate(id, { completedstage: "typeof vari docs uploaded" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");

  if (!updateUser) {
    return res.status(500).send("internal error");
  }

  const uploadVari = await hotelvaridocx.findOneAndUpdate({ user_id: id }, { typedocs: typedocs, varification_image: varification_image }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");

  res.status(201).json(updateUser);
};

export default { hoteldatavari: hoteldatavari, chooseveridpocs: chooseveridpocs };
