import { prisma } from "../.."
import { Product, ProductType } from "../../models/Product"

export class ProductRepository {
  private repository = prisma.products
  
  async getProducts(){
    return await this.repository.findMany()
  }

  async getProductByID(id: string){
    return await this.repository.findUnique({
        where: {
          id
      }
    })
  }

  async getProductByCode(code: string){
    return await this.repository.findUnique({
        where: {
          code
      }
    })
  }

  async getProductsByBarcode(barcode: number){
    return await this.repository.findMany({
        where: {
          barcode
      }
    })
  }

  async getProductsByDescription(description: string){
    return await this.repository.findMany({
        where: {
          description
      }
    })
  }

  async getProductsByType(type: ProductType){
    return await this.repository.findMany({
        where: {
          type
      }
    })
  }

  async createProduct(data: Product){
    return await this.repository.create({
      data
    })
  }


}