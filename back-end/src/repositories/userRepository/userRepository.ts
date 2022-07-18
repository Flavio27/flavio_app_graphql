import { prisma } from "../.."
import { User } from "../../models/User"

export class UserRepository {
  private repository = prisma.user
  
  async getUsers(){
    return await this.repository.findMany()
  }

  async getUserByID(id: string){
    return await this.repository.findUnique({
        where: {
          id
      }
    })
  }

  async createUser(data: User){
    return await this.repository.create({
      data
    })
  }


}