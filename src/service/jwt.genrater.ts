import jwt from 'jsonwebtoken';

const jwtgenrater = async (user_id: string)=> {
  const token = jwt.sign({ id: user_id }, "mysecret", { expiresIn: '2d' });
  return token;
};

export default jwtgenrater;
