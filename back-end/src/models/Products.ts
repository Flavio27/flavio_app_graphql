import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";

export enum ProductType {
  ALIMENTO = "ALIMENTO",
  LIMPEZA = "LIMPEZA",
  HIGIENE = "HIGIENE",
  UTENSILIOS = "UTENSILIOS",
}

registerEnumType(ProductType, {
  name: "ProductType",
  description: "Types of products",
});


@ObjectType()
export class Products {
  @Field(type => ID)
  id: string;

  @Field()
  code: string;
  
  @Field(type => Int)
  barcode: number;

  @Field()
  description: string;

  @Field(type => ProductType)
  type: ProductType;
  
}