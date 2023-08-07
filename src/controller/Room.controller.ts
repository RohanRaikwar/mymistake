import { Request, Response } from 'express';
import Joi from 'joi';
import HotelAuth from '../Model/hotel.model';
import HotelRoome from '../Model/hotelRoome.model';

export const roomtypescontroller = async (req: Request, res: Response) => {
  const { data, id } = req.body;

  const Schema = Joi.object({
    data: Joi.array()
      .min(1)
      .items(Joi.string())
      .required(),
  });

  try {
    await Schema.validateAsync({ data: data });
  } catch (err) {
    return res.status(400).json("invalide request");
  }
  const checkRoomData=  await HotelRoome.find({user_id:id})
  if(!checkRoomData){

  const addrooms = new HotelRoome({ room_type: data, user_id: id });
  const savedata = await addrooms.save();
    
  }
  else{
     await HotelRoome.findOneAndUpdate({user_id:id},{room_type:data})
  }

  const updatestage = await HotelAuth.findByIdAndUpdate(id, { completedstage: "room types uploaded" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");
  res.status(201).json(updatestage);
};

export const roomavilable = async (req: Request, res: Response) => {
  console.log(req.body);
  const data = req.body.id;
  const sohan = Joi.array().items(Joi.object().keys({
    "room_type": Joi.string().required(),
    "rooms": Joi.array().items(Joi.number()).required(),
    "no_guests": Joi.number().required(),
    "base_price": Joi.number().required()
  })).required();
  try {
     const nn =await sohan.validateAsync(req.body.data);
     console.log(nn);
     
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const updaterooms = await HotelRoome.findOneAndUpdate({ user_id: data }, { room_availibility: req.body.data });
    console.log(updaterooms);
    
  } catch (err) {
    return res.status(404).json(err);
  }

  const updatestage = await HotelAuth.findByIdAndUpdate(data, { completedstage: "room avilibility filled" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp");
  res.status(201).json(updatestage);
};

export const addroomservices = async (req: Request, res: Response) => {
  const { chargeble_service, id } = req.body;
  console.log(req.body);

  const Schema = Joi.object().keys({
    chargeble_service: Joi.array().items(Joi.string().regex(/^(Kitchen|Laundry|Spa|Gym|Banquet|Swimming pool|Salon|HouseKeeping)$/).required()).required(),
  });

  try {
    await Schema.validateAsync(req.body.data);
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const savedata = await HotelRoome.findOneAndUpdate({ user_id: id }, { chargeble_service: req.body.chargeble_service });
  } catch (err) {
    console.log(err)
    
    return res.status(500).json(err);
  }

 const updatestage = await HotelAuth.findByIdAndUpdate(id, { completedstage: "chargeble_service filled" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt  -otp");
    
 
  res.status(201).json(updatestage);
};

export const addanmanties = async (req: Request, res: Response)=> {
  const { amenities, id } = req.body;
  console.log(amenities);

  const Schema = Joi.array().items(Joi.object({
    nameof_amenities: Joi.string().required(),
    types: Joi.array().items(Joi.string().required()).required(),
  }));

  try {
    const validater = await Schema.validate(amenities);
    console.log(validater);
  } catch (err) {
    return res.status(400).json("invalide request");
  }

  const update = await HotelRoome.findOneAndUpdate({ user_id: id }, { Amenities: amenities });
  const updatestage = await HotelAuth.findByIdAndUpdate(id, { completedstage: "amenities filled" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt -otp ");
  res.status(201).json(updatestage);
};

export const uploadphotos = async (req: Request, res: Response) => {
  const { photos, id } = req.body;
  console.log(id);

  const Schema = Joi.array().items(Joi.object().keys({
    name: Joi.string().required(),
    path: Joi.string().required(),
  })).required();

  try {
    await Schema.validateAsync(req.body.photos);
  } catch (err) {
    return res.status(400).json(err);
  }

  const uploadpicture = await HotelRoome.findOneAndUpdate({ user_id: id }, { photos: photos });
  const updatestage = await HotelAuth.findByIdAndUpdate(id, { completedstage: "room photo uploded && login steps complete" }, { returnOriginal: false }).select("-__v -createdAt -updatedAt  -otp");
  res.status(201).json(updatestage);
};

export default {
  roomtypescontroller: roomtypescontroller,
  roomavilable: roomavilable,
  addroomservices: addroomservices,
  addanmanties: addanmanties,
  uploadphotos: uploadphotos,
};
