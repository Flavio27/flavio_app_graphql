import { prisma } from "../..";

export class RefreshTokenRepository {
  private repository = prisma.refreshToken

  async getRefreshTokenById(id: string) {
    return await this.repository.findUnique({
      where: {
        id
      }
    })
  }
  
  async getRefreshTokenByUserId(userId: string) {
    return await this.repository.findUnique({
      where: {
        userId
      }
    })
  }

  async createRefreshToken(userId: string, expiresIn: number) {
    return await this.repository.create({
      data: {
        userId,
        expiresIn
      }
    })
  }

  async deleteRefreshToken(userId: string) {
    return await this.repository.delete({
      where: {
        userId
      }
    })
  }

  async renewRefreshToken(userId: string, expiresIn: number) {
    await this.deleteRefreshToken(userId)
    return await this.createRefreshToken(userId, expiresIn)
  }

}