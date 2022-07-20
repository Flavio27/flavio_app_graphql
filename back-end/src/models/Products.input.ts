import { IsInt, IsNumber, IsPositive, IsString, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ProductType } from "./Products";

@InputType()
export class ProductInput {
  @Field()
  @IsString()
  @Length(1, 30)
  code: string;

  @Field()
  @IsPositive()
  @IsInt()
  @IsNumber()
  barcode: number;
  
  @Field()
  @IsString()
  @Length(1, 150)
  description: string;

  @Field(type => ProductType)
  type: ProductType;
}
