import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string;

  @Field()
  email: string;
  
  @Field()
  name: string;

  @Field()
  password: string;
}