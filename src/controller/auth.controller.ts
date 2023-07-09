import { Request, Response } from "express";
import otpgen from "../service/opt.genrater";
import jwtgenrater from "../service/jwt.genrater";
import otpsend from "../service/otp.send";
import joi, { invalid } from 'joi'


import { HotelModel } from "../model/hotel.auth";
import { AwsInstance } from "twilio/lib/rest/accounts/v1/credential/aws";



export const login = async (req: Request, res: Response) => {
  const {mobile_no,otp} = req.body;

  
  
  
  
  const  Schema = joi.object({
     number:joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
     otp:joi.string().regex(/^[0-9]{4}$/).messages({'string.pattern.base':`otp must have 4 digits.`}).required()
  })
  try{
    const parser =  await  Schema.validateAsync({number:mobile_no,otp:otp})
  }
 catch(err){
  return res.status(404).json({massage:"invalid mobile number"})
 }
  const otpregen = await otpgen()
  const checkexit = await HotelModel.findOne({mobile_no:mobile_no,userverify:"true"}).select('-__v -createdAt -updatedAt')

  
  if(!checkexit){
    return res.status(401).json({massage:"user are not found"})

  }
 
  
  if(checkexit.otp!=otp){
    return res.status(401).json({massage:"invlide otp"})
  }
   const updateotp = await HotelModel.findOneAndUpdate({mobile_no:mobile_no},{otp:otpregen}).select('-__v -otp -createdAt -updatedAt')
  if(!updateotp){
    return res.status(500).send("internal error")
  }

  const token = await jwtgenrater(updateotp.id)
  
 
  


  res.status(200).json({massage:updateotp,token:token})


 


};

export const signupotp = async (req: Request, res: Response) => {
  const mobile_no = req.body.mobile_no;

  const Schema = joi.object({
    number:joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
  })
  try {
    const value = await Schema.validateAsync({ number:mobile_no});
    
    
}
catch (err) {
  return res.status(401).json("invalid Mobile number")
 }
  try{
    const data = await HotelModel.findOne({mobile_no:mobile_no})
    
    if(data){
      return  res.status(403).json("user are already exit")
    }

  }
  catch(err){
    return res.json(err)

  }
//  const otpgive = await otpsend(saveuser.otp,number)
 //  if(otpgive=="invalid number"){
   // return res.status(402).json({massage:"incorrect mobile number"})
  // } 


  const otp = await otpgen();
  const addata  =  new HotelModel({mobile_no:mobile_no,otp:otp}) 
  const saveuser = await addata.save()

 
   
   res.status(201).json({massage:` your otp send on ${saveuser.mobile_no} `})

   
};
 export const loginotp = async (req:Request,res:Response)=>{
  const mobile_no = req.body.mobile_no
  const Schema = joi.object({
    number:joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
  })
  try{
    const numbervaliation =  await Schema.validateAsync({number:mobile_no})
  }
  catch(err){
    return res.status(401).send("invalid number")
  }
  const userdata = await HotelModel.findOne({mobile_no:mobile_no,userverify:true})
  if(!userdata){
    return res.status(404).json("user not found")
  }

  res.status(200).json({massage:`your otp send on ${userdata.mobile_no}`})
}
export const signup = async (req:Request,res:Response)=>{
  const {mobile_no,otp} = req.body
 
  
  const Schema = joi.object({
    number:joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
    otp:joi.string().regex(/^[0-9]{4}$/).messages({'string.pattern.base':`otp must have 4 digits.`}).required()
  })
  try{
    const validater =  await Schema.validateAsync({number:mobile_no,otp:otp})
  }
  catch(err){
    return res.status(400).json({massage:"bad imformation"})
  }
  const otpregen = await otpgen()
  try{
    const userdata = await  HotelModel.findOne({mobile_no:mobile_no,userverify:"false"})
    
    if(!userdata){
      return res.status(404).json("user are not found")
    }
    if(userdata.otp!=otp){
      return res.status(401).json({massage:"invalid otp"})
    }
    
  }
  catch(err){
    return res.status(404).json({massage:"intenal err"})

  }
  const updata = await HotelModel.findOneAndUpdate({mobile_no:mobile_no},{userverify:true,otp:otpregen,completedstage:"login"},{returnOriginal:false}).select('-__v -otp -createdAt -updatedAt')
  const token =  await jwtgenrater(updata.id)
  
  res.status(200).json({data:updata,token:token})
 
}
export const resetotp = async (req:Request,res:Response)=>{
  const mobile_no = req.body.mobile_no
  const Schema = joi.object({
    number:joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
  })
  try{
    const numbervaliation = await Schema.validateAsync({number:mobile_no})
  }
  catch(err){
    return res.status(401).json({massage:"invlide mobile number"})
  }
  const userdata = await  HotelModel.findOne({mobile_no:mobile_no})
  if(!userdata){
    return res.status(404).json({massage:"user are not found"})

  }
  const otpregen =  await otpgen()
  const updateotp =  await HotelModel.findOneAndUpdate({mobile_no:mobile_no},{otp:otpregen})
  res.status(202).json({massage:`otp resend on ${updateotp.mobile_no}`})

}

export default { login, signup ,loginotp,signupotp,resetotp};


