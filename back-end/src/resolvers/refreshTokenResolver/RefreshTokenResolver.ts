import  dayjs  from 'dayjs';
import { UserRepository } from './../../repositories/userRepository/userRepository';
import { Arg, Query } from "type-graphql";
import { RefreshTokenRepository } from "../../repositories/refreshTokenRepository/refreshTokenRepository";
import { refreshTokenExpirationTime, tokenExpirationTime } from '../../utils/variables';
import { encodeToken } from '../../utils/encodeToken';

export class RefreshTokenResolver {
  private repository = new RefreshTokenRepository()

  @Query(() => String)
  async refreshToken(@Arg('id') id: string) {
    const refreshToken = await this.repository.getRefreshTokenById(id)
    
    if (!refreshToken){
      throw new Error('Refresh token not exists')
    }
    const { expiresIn, userId } = refreshToken
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(expiresIn))
    
    if (refreshTokenExpired){
      const expiresIn = refreshTokenExpirationTime
      await this.repository.renewRefreshToken(userId, expiresIn)
    }

    const user = await new UserRepository().getUserByID(userId)

    if (!user){
      throw new Error('User ID not exists')
    }

    const token = encodeToken({
      payload: user,
      options: {
        subject: user.id,
        expiresIn: tokenExpirationTime
      }
    })

    return token
  }
}