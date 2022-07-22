import { prisma } from "../.."
import { User } from "../../models/User"

export class UserRepository {
  private repository = prisma.user
  
  async getUsers(){
    return await this.repository.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      }
    })
  }

  async getUserByID(id: string){
    return await this.repository.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
        where: {
          id
      }
    })
  }

  async getUserByEmail(email: string){
    return await this.repository.findUnique({
        where: {
          email
      }
    })
  }

  async createUser(data: User){
    return await this.repository.create({
      data
    })
  }


}