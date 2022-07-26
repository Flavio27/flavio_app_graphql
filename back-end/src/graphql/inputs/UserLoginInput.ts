import {IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  password: string;
}

