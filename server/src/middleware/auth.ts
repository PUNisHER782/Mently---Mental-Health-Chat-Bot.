import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

const getJwtSecret = (): Secret => {
  return process.env.JWT_SECRET || 'secret';
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    req.userId = decoded.userId as string;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const generateToken = (userId: string) => {
  const expiry = process.env.JWT_EXPIRY || '7d';
  const options: SignOptions = {
    expiresIn: expiry as unknown as SignOptions['expiresIn'],
  };

  return jwt.sign({ userId }, getJwtSecret(), options);
};
