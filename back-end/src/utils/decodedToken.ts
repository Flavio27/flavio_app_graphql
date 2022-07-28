import jwt from 'jsonwebtoken';

export const decodedToken = (token: string) => {
  jwt.decode(token)
  const decoded = jwt.decode(token)
  return decoded
}
