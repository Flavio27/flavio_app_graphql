import { prisma } from "../.."
import { User } from "../../models/User"

interface IUpdateUser{
  data: Partial<User>
  where: Partial<User>
}
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
        confirmed: true,
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

  async updateUser(data: IUpdateUser){
    return await this.repository.update({
      where: data.where,
      data: data.data
    })
  }


}