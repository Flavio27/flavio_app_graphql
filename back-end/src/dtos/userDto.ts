import { ClientUser, User } from "../models/User";

export const userDto = (user: User) =>(
  {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    confirmed: user.confirmed
  }
)


