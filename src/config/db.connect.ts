import mongoose  from "mongoose";



const conn = async() =>{
      try{
        const conn = await mongoose.connect("mongodb+srv://rohansingh9675:Sohansingh9675@cluster0.h4gigep.mongodb.net/test?retryWrites=true&w=majority")
        if(!conn){
            return "not connected"
        }
        console.log("connecet database");
        
        

      }
      catch(err){
        console.log(err);
        
      }
}

export default conn