import { prisma } from "../..";

export class ConfirmUserRepository {
  private repository = prisma.confirmLoginCode;

  async getConfirmationByUserIdAndCode(userId: string, code: number) {
    return await this.repository.findFirst({
      where: {
        userId,
        code,
      },
    });
  }
  async getConfirmationByUserId(userId: string) {
    return await this.repository.findUnique({
      where: {
        userId,
      },
    });
  }

  async createConfirmCode(userId: string, code: number, expiresIn: number) {
    return await this.repository.create({
      data: {
        code,
        userId,
        expiresIn,
      },
    });
  }

  async deleteConfirmCode(userId: string) {
    return await this.repository.delete({
      where: {
        userId,
      },
    });
  }

  async renewConfirmCode(userId: string, code: number, expiresIn: number) {
    return await this.deleteConfirmCode(userId).finally(() =>
      this.createConfirmCode(userId, code, expiresIn)
    );
  }
}
