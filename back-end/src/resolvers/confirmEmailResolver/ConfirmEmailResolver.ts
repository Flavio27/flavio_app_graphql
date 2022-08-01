import { UserRepository } from "./../../repositories/userRepository/userRepository";
import dayjs from "dayjs";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { ConfirmUserRepository } from "./../../repositories/confirmUserRepository/confirmUserRepository";
import { randomCode } from "../../utils/randomCode";
import { confirmEmailCodeExpirationTime } from "../../utils/variables";
import { sendEmail } from "../../utils/sendEmail";

@Resolver()
export class ConfirmEmailResolver {
  private repository = new ConfirmUserRepository();

  @Query(() => Boolean)
  async confirmEmail(
    @Arg("userId") userId: string,
    @Arg("code", (_type) => Int) code: number
  ) {
    const confirmation = await this.repository.getConfirmationByUserIdAndCode(
      userId,
      code
    );

    if (!confirmation) {
      throw new Error("Invalid code");
    }

    const codeExpired = dayjs().isAfter(dayjs.unix(confirmation.expiresIn));

    if (codeExpired) {
      throw new Error(
        "This code confirmation expired. Please request a new code"
      );
    }
    const userRepository = new UserRepository();
    const user = await userRepository.getUserByID(userId);

    if (!user) {
      throw new Error("This user not exists");
    }

    if (user.confirmed) {
      await this.repository.deleteConfirmCode(confirmation.userId)
      throw new Error("This user email already confirmed");
    }

    await userRepository
      .updateUser({
        where: {
          id: userId,
        },
        data: {
          confirmed: true,
        },
      })
      .finally(() => this.repository.deleteConfirmCode(userId));

    return true;
  }

  @Query(() => Boolean)
  async renewConfirmCode(
    @Arg("userId") userId: string,
  ){
    const confirmation = await this.repository.getConfirmationByUserId(
      userId,
    );

    const user = await new UserRepository().getUserByID(userId)
    
    if(!user){
      throw new Error("This user not exists");
    }
    
    if (!confirmation) {
      throw new Error("This confirmation code not exists");
    }

    if(user.confirmed){
      await this.repository.deleteConfirmCode(confirmation.userId)
      throw new Error("This user email already confirmed");
    }

    const codeExpired = dayjs().isAfter(dayjs.unix(confirmation.expiresIn));

    if(!codeExpired){
      throw new Error("The previous confirmation code does not expire yet, please check your email");
    }

    const code = randomCode()
    await this.repository.renewConfirmCode(user.id, code, confirmEmailCodeExpirationTime)
    await sendEmail(user.email, code);

    return true
  }
}
