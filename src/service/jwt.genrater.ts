import jwt from 'jsonwebtoken'

const jwtgenrater = async(usesr_id:string)=>{

    const token = jwt.sign({id:usesr_id},"mysecret",{expiresIn:'2d'})
   

    return token


    


}
export default jwtgenrater