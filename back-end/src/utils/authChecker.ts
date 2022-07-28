import  jwt  from 'jsonwebtoken';
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<any> = (
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