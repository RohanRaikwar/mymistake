

const otpsend = async(otp: number,number: number):Promise<any>=>{
    const accountSid = 'AC43b19300b20a0a28291b829ff1c4b8ad';
    const authToken = 'f7586ddc116c23de2c938c2c670308d2';
    const client = require('twilio')(accountSid, authToken);
    
    try{const tt  =  await client.messages
        .create({
            body: `your stp ${otp}` ,
            from: '+15734988739',
            to: `+91${number}`
        })
        .then((message:any) => {if(!message.sid) return "inavlid mibile number"})

    }
    catch(err){
        return "invalid number"

    }
       


      
        
    }
    
    export default otpsend