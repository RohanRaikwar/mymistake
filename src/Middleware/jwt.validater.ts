import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtValidator = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "authorization required" });
  }

  const pureToken = token.split(" ")[1];

  try {
    const verifyToken =  jwt.verify(pureToken, "mysecret");
  } catch (err) {
    return res.status(404).send("login session expired");
  }

  const decode:any = await jwt.decode(pureToken);
  req.body.id = decode.id;
  next();
};

export default jwtValidator;
