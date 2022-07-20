import crypto from 'node:crypto';
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { Products } from '../models/Products';
import { ProductInput } from '../models/Products.input';
import { ProductRepository } from './../repositories/productRepository/productRepository';

@Resolver()
export class ProductResolver {
  private repository = new ProductRepository()

  @Query(() => [Products])
  async products() {
    const allProducts = await this.repository.getProducts()
    return allProducts
  }

  @Query(() => Products)
  async productById(
    @Arg('id') id: string
  ) {
    const product = await this.repository.getProductByID(id)
    return product
  }

  @Query(() => Products)
  async productByCode(
    @Arg('code') code: string
  ) {
    const product = await this.repository.getProductByID(code)
    return product
  }

  @Query(() => Products)
  async productByBarcode(
    @Arg('barcode', type => Int) barcode: number 
  ) {
    const products = await this.repository.getProductsByBarcode(barcode)
    return products
  }

  @Query(() => Products)
  async productByDescription(
    @Arg('description') description: string
  ) {
    const products = await this.repository.getProductsByDescription(description)
    return products
  }

  @Mutation(() => Products)
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
      type
    })
    return newProduct
  }
} 