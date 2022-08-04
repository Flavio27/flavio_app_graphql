import { Field, ObjectType } from "type-graphql"
import { RefreshTokenType } from "./RefreshToken"


@ObjectType()
export class UserLoginType {
  @Field({ nullable: true })
  token?: string

  @Field({ nullable: true })
  refreshToken?: RefreshTokenType

  @Field({ nullable: true })
  confirmed?: Boolean
}