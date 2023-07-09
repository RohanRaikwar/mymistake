const otpGenerator = require('otp-generator')
const otpgen = async()=>{
      const otp  =  await otpGenerator.generate(4, {digits:true, upperCaseAlphabets: false, lowerCaseAlphabets:false,specialChars: false });
      return otp

}
export default otpgen