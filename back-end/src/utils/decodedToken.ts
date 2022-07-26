import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';

export const decodedToken = (token: string) => {
  jwt.decode(token)
  const decoded = jwt.decode(token)
  return decoded
}

export const customAuthChecker: AuthChecker<any> = (
  { root, args, context, info, },
  roles,
) => {
  const token = context.req.headers.authorization

  if (!token){
    throw new Error('Token is missing')
  }

  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

  return true
};