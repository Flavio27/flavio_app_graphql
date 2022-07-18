import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string;

  @Field({ nullable: true })
  email: string;
  
  @Field()
  name: string;
}