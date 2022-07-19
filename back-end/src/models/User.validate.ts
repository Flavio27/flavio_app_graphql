import { IsEmail, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  @Length(2, 20)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

