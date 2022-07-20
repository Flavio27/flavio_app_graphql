import faker from "faker";
import { ProductRepository } from "./productRepository";
import { ProductBuilder } from "./../../infrastructure/builders/productBuilder";
import { prisma } from "../..";
import { Product, ProductType } from "../../models/Product";
import { randomUUID } from "crypto";

describe("productRepository", () => {
  test("it should return all products", async () => {
    // Arrange
    await new ProductBuilder().insert();

    // Act
    const allProducts = await new ProductRepository().getProducts();
    const products = await prisma.products.findMany();

    // Assert
    expect(products).not.toBe(null);
    expect(products).not.toBe(undefined);
    expect(allProducts).not.toBe(null);
    expect(allProducts).not.toBe(undefined);
    expect(allProducts).toEqual(products);
  });

  test("it should get product by ID", async () => {
    // Arrange
    const newProduct = await new ProductBuilder().insert();

    // Act
    const product = await new ProductRepository().getProductByID(newProduct.id);

    // Assert
    expect(newProduct).not.toBe(null);
    expect(newProduct).not.toBe(undefined);
    expect(product).not.toBe(null);
    expect(product).not.toBe(undefined);
    expect(product).toEqual(newProduct);
  });

  test("it should get product by code", async () => {
    // Arrange
    const newProduct = await new ProductBuilder().insert();

    // Act
    const product = await new ProductRepository().getProductByCode(
      newProduct.code
    );

    // Assert
    expect(newProduct).not.toBe(null);
    expect(newProduct).not.toBe(undefined);
    expect(product).not.toBe(null);
    expect(product).not.toBe(undefined);
    expect(product).toEqual(newProduct);
  });

  test("it should get product by barcode", async () => {
    // Arrange
    const newProduct = await new ProductBuilder().insert();

    // Act
    const product = await new ProductRepository().getProductsByBarcode(
      newProduct.barcode
    );

    // Assert
    expect(newProduct).not.toBe(null);
    expect(newProduct).not.toBe(undefined);
    expect(product).not.toBe(null);
    expect(product).not.toBe(undefined);
    expect(product).toContainEqual(newProduct);
  });

  test("it should get product by description", async () => {
    // Arrange
    const newProduct = await new ProductBuilder().insert();

    // Act
    const product = await new ProductRepository().getProductsByDescription(
      newProduct.description
    );

    // Assert
    expect(newProduct).not.toBe(null);
    expect(newProduct).not.toBe(undefined);
    expect(product).not.toBe(null);
    expect(product).not.toBe(undefined);
    expect(product).toContainEqual(newProduct);
  });

  test("it should get product by type", async () => {
    // Arrange
    const newProduct = await new ProductBuilder()
    .withType(ProductType.HIGIENE)
    .insert();

    // Act
    const product = await new ProductRepository().getProductsByType(
      newProduct.type as ProductType
    );

    // Assert
    expect(newProduct).not.toBe(null);
    expect(newProduct).not.toBe(undefined);
    expect(product).not.toBe(null);
    expect(product).not.toBe(undefined);
    expect(product).toContainEqual(newProduct);
  });

  test("it should create a new product", async () => {
    // Arrange
    const newProduct: Product = {
      id: randomUUID(),
      code: `PROD${faker.datatype.number({
        min: 1,
        max: 99999,
      })}`,
      barcode: faker.datatype.number({
        min: 999999,
        max: 999999999,
      }),
      description: faker.random.words(),
      type: ProductType.UTENSILIOS,
    };

    // Act
    const product = await new ProductRepository().createProduct(newProduct);
    const foundProduct = await new ProductRepository().getProductByID(newProduct.id);

    // Assert
    expect(newProduct).not.toBe(null);
    expect(newProduct).not.toBe(undefined);
    expect(product).not.toBe(null);
    expect(product).not.toBe(undefined);
    expect(foundProduct).not.toBe(null);
    expect(foundProduct).not.toBe(undefined);
    expect(product).toEqual(foundProduct);
  });
});
