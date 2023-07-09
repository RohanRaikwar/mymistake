import { timeStamp } from "console";
import mongoose, { Schema,model } from "mongoose";

interface hotel {
    mobile_no:Number,
    otp:number,
    role:string,
    completedstage:string,
    userverify:boolean





}


const Hotel = new Schema<hotel>({
    mobile_no:{
        required:true,
        type:Number,
        maxlength:10,
        unique:true


    },
    otp:{
        type:Number,
        maxlength:4,
        required:true
        
    },
    role:{
        type:String,
        required:true,
        default:"user"


    },
    completedstage:{
        type:String,
        required:true,
        default:"not verify"
    },
    userverify:{
        type:Boolean,
        required:true,
        default:false
    }


},
{
        timestamps:true,
    }
)


export const HotelModel =  model<hotel>("HotelModel",Hotel)