import { UserRepository } from "./../../repositories/userRepository/userRepository";
import dayjs from "dayjs";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { ConfirmUserRepository } from "./../../repositories/confirmUserRepository/confirmUserRepository";
import { randomCode } from "../../utils/randomCode";
import {
  confirmEmailCodeExpirationTime,
  refreshTokenExpirationTime,
  tokenExpirationTime,
} from "../../utils/variables";
import { sendEmail } from "../../utils/sendEmail";
import { RefreshToken } from "@prisma/client";
import { UserResolver } from "../userResolver/UserResolver";
import { encodeToken } from "../../utils/encodeToken";
import { userDto } from "../../dtos/userDto";
import { RefreshTokenRepository } from "../../repositories/refreshTokenRepository/refreshTokenRepository";
import { UserLoginType } from "../../models/UserLogin";

interface IUserLoginInput {
  token?: String
  refreshToken?: RefreshToken
  confirmed?: Boolean
}

@Resolver()
export class ConfirmEmailResolver {
  private repository = new ConfirmUserRepository();

  @Query(() => UserLoginType)
  async confirmEmail(
    @Arg("email") email: string,
    @Arg("code", (_type) => Int) code: number
  ): Promise<IUserLoginInput> {
    const userRepository = new UserRepository();
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("This user not exists");
    }

    const confirmation = await this.repository.getConfirmationByUserIdAndCode(
      user.id,
      code
    );

    if (user.confirmed) {
      if (confirmation) {
        await this.repository.deleteConfirmCode(confirmation.userId);
      }
      throw new Error("This user email already confirmed");
    }

    if (!confirmation) {
      throw new Error("Invalid code");
    }

    const codeExpired = dayjs().isAfter(dayjs.unix(confirmation.expiresIn));

    if (codeExpired) {
      throw new Error(
        "This code confirmation expired. Please request a new code"
      );
    }

    await userRepository
      .updateUser({
        where: {
          id: user.id,
        },
        data: {
          confirmed: true,
        },
      })
      .finally(() => this.repository.deleteConfirmCode(user.id));

    const token = encodeToken({
      payload: userDto(user),
      options: {
        subject: user.id,
        expiresIn: tokenExpirationTime,
      },
    });

    const refreshToken = await new RefreshTokenRepository().createRefreshToken(
      user.id,
      refreshTokenExpirationTime()
    );

    return { token, refreshToken: refreshToken, confirmed: true };
  }

  @Query(() => Boolean)
  async renewConfirmCode(@Arg("userId") userId: string) {
    const confirmation = await this.repository.getConfirmationByUserId(userId);

    const user = await new UserRepository().getUserByID(userId);

    if (!user) {
      throw new Error("This user not exists");
    }

    if (!confirmation) {
      throw new Error("This confirmation code not exists");
    }

    if (user.confirmed) {
      await this.repository.deleteConfirmCode(confirmation.userId);
      throw new Error("This user email already confirmed");
    }

    const codeExpired = dayjs().isAfter(dayjs.unix(confirmation.expiresIn));

    if (!codeExpired) {
      throw new Error(
        "The previous confirmation code does not expire yet, please check your email"
      );
    }

    const code = randomCode();
    await this.repository.renewConfirmCode(
      user.id,
      code,
      confirmEmailCodeExpirationTime()
    );
    await sendEmail(user.email, code);

    return true;
  }
}
