import { IsAlpha, IsEmail, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  @IsAlpha()
  @Length(2, 20)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

