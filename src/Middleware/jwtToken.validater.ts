import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


const jwtvelidater =(req:Request,res:Response,next:NextFunction)=>{
    const token =  req.headers.authorization
    if(!token){
        return res.status(400).json({massage:"authrizationn required"})
    }
    const  puretoken = token.split("")[1]
    const verifytiken = jwt.verify(puretoken,"mysecret")
    if(!verifytiken){
        return res.status(401).json({massage :"unutheriezed"})
    }
    const decode = jwt.decode(puretoken)
    console.log(decode.id);
    
    req.body.id = decode.id
    next()


}


export default jwtvelidater