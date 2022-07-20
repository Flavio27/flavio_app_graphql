import crypto from 'node:crypto';
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { Product, ProductType } from '../models/Product';
import { ProductInput } from '../models/Product.input';
import { ProductRepository } from './../repositories/productRepository/productRepository';

@Resolver()
export class ProductResolver {
  private repository = new ProductRepository()

  @Query(() => [Product])
  async products() {
    const allProducts = await this.repository.getProducts()
    return allProducts
  }

  @Query(() => Product)
  async productById(
    @Arg('id') id: string
  ) {
    const product = await this.repository.getProductByID(id)
    return product
  }

  @Query(() => Product)
  async productByCode(
    @Arg('code') code: string
  ) {
    const product = await this.repository.getProductByCode(code)
    return product
  }

  @Query(() => [Product])
  async productByBarcode(
    @Arg('barcode', type => Int) barcode: number 
  ) {
    const products = await this.repository.getProductsByBarcode(barcode)
    return products
  }

  @Query(() => [Product])
  async productByDescription(
    @Arg('description') description: string
  ) {
    const products = await this.repository.getProductsByDescription(description)
    return products
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data")
  {
    code,
    barcode,
    description,
    type,
  }: ProductInput) {
    const newProduct = await this.repository.createProduct({
      id: crypto.randomUUID(),
      code,
      barcode,
      description,
      type,
    })
    return newProduct
  }
} 