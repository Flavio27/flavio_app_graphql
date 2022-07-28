import { Field, ObjectType } from "type-graphql"
import { RefreshTokenType } from "./RefreshToken"


@ObjectType()
export class UserLoginType {
  @Field()
  token: string

  @Field()
  refreshToken: RefreshTokenType
}