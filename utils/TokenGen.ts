import jwt from 'jsonwebtoken';

type Payload = {
  name: string;
  email: string;
};

const generateToken = (name: string, email: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable not defined');
  }

  const payload: Payload = { name, email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7, 
  });
};

export default generateToken;