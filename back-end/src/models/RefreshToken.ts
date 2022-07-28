import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class RefreshTokenType {
  @Field()
  id: string

  @Field()
  expiresIn: number

  @Field()
  userId: string
}