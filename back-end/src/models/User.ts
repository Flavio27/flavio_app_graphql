import { Length, maxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string;

  @Field({ nullable: true })
  @Length(1, 3)
  email: string;
  
  @Field()
  name: string;
}