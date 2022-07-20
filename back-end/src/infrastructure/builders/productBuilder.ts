import { randomUUID } from "crypto";
import faker from "faker";
import { prisma } from "../..";
import { Product, ProductType } from "./../../models/Product";

export class ProductBuilder {
  private model = new Product();
  constructor() {
    this.model.id = randomUUID();
    this.model.code = `PROD${faker.datatype.number({
      min: 1,
      max: 99999,
    })}`;
    this.model.barcode = faker.datatype.number({
      min: 999999,
      max: 999999999,
    });
    this.model.description = faker.random.words();
    this.model.type = ProductType.UTENSILIOS;
  }

  withId(id: string) {
    this.model.id = id;
    return this;
  }

  withCode(code: string) {
    this.model.code = code;
    return this;
  }

  withBarcode(barcode: number) {
    this.model.barcode = barcode;
    return this;
  }

  withDescription(description: string) {
    this.model.description = description;
    return this;
  }

  withType(type: ProductType) {
    this.model.type = type;
    return this;
  }

  async insert(){
    const product = prisma.products
    return await product.create({
      data: this.model
    })
  }
  
}
