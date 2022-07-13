import { Length, maxLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string;

  @Field({ nullable: true })
  email: string;
  
  @Field()
  @Length(1, 1) // Validação do tamanho da string usando o class-validator
  name: string;
}