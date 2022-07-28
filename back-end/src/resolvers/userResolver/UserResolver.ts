import { RefreshToken } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { Arg, Authorized , Mutation, Query, Resolver } from "type-graphql";
import { userDto } from '../../dtos/userDto';
import { UserLoginInput } from '../../graphql/inputs/UserLoginInput';
import { UserInput } from '../../models/User.input';
import { UserLoginType } from '../../models/UserLogin';
import { RefreshTokenRepository } from '../../repositories/refreshTokenRepository/refreshTokenRepository';
import { UserRepository } from '../../repositories/userRepository/userRepository';
import { encodeToken } from '../../utils/encodeToken';
import { refreshTokenExpirationTime, tokenExpirationTime } from '../../utils/variables';
import { ClientUser } from './../../models/User';

interface IUserLoginInput {
  token: String
  refreshToken: RefreshToken
}

@Resolver()
export class UserResolver {
  private repository = new UserRepository()

  @Authorized("ADMIN", "MODERATOR")
  @Query(() => [ClientUser])
  async users() {
    const allUsers = await this.repository.getUsers()
    return allUsers
  }

  @Query(() => ClientUser)
  async userById(
    @Arg('id') id: string
  ) {
    const user = await this.repository.getUserByID(id)
    return user
  }

  @Query(() => UserLoginType)
  async userLogin(@Arg("data")
  {
    email,
    password
  }: UserLoginInput): Promise<IUserLoginInput> {
    const user = await this.repository.getUserByEmail(email)
    if (!user) throw new Error('Email or password incorrect!');

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new Error('Email or password incorrect!');

    const token = encodeToken({
      payload: userDto(user),
      options:{
        subject: user.id,
        expiresIn: tokenExpirationTime
    }})

    const refreshTokenRepository = new RefreshTokenRepository()
    const refreshToken = await refreshTokenRepository.getRefreshTokenByUserId(user.id)

    const expiresIn = refreshTokenExpirationTime

    if (!refreshToken){
      const refreshToken = await refreshTokenRepository.createRefreshToken(user.id, expiresIn)
      return {token, refreshToken}
    }

    const newRefreshToken = await refreshTokenRepository.renewRefreshToken(user.id, expiresIn)
    return {token, refreshToken: newRefreshToken}
  }

  @Mutation(() => String)
  async createUser(@Arg("data")
  {
    name,
    email,
    password,
  }: UserInput): Promise<String> {
    const userAlreadyExists = await this.repository.getUserByEmail(email)
    if (userAlreadyExists) throw new Error('This user already exists.');

    const user = await this.repository.createUser({
      id: crypto.randomUUID(),
      name,
      email,
      password: bcrypt.hashSync(password, 3),
      created_at: new Date()
    })

    const token = encodeToken({
      payload: userDto(user),
    })

    return token
  }
} 