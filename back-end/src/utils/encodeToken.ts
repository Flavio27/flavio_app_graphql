import jwt  from 'jsonwebtoken';

interface IJWT {
  payload: string | object | Buffer
  options?: jwt.SignOptions | undefined
}

export const encodeToken = ({payload, options}: IJWT) => {
  const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, options);
  return token
};
