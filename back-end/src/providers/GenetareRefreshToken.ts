import { prisma } from "..";
import { refreshTokenExpirationTime } from "../utils/variables";

export class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = refreshTokenExpirationTime()

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })

    return generateRefreshToken
  }
}