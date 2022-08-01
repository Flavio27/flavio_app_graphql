import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class ConfirmUserType {
  @Field()
  id: string

  @Field()
  expiresIn: number

  @Field()
  userId: string

  @Field()
  code: number
}