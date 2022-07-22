import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { userDto } from '../../dtos/userDto';
import { UserLoginInput } from '../../graphql/inputs/UserLoginInput';
import { UserInput } from '../../models/User.input';
import { UserRepository } from '../../repositories/userRepository/userRepository';
import { ClientUser } from './../../models/User';

@Resolver()
export class UserResolver {
  private repository = new UserRepository()

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

  @Query(() => String)
  async userLogin(@Arg("data")
  {
    email,
    password
  }: UserLoginInput): Promise<String> {
    const user = await this.repository.getUserByEmail(email)
    if (!user) throw new Error('Email or password incorrect!');

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new Error('Email or password incorrect!');

    const encodeResult = jwt.sign(userDto(user), "supersecret")
    return encodeResult
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

    const encodeResult = jwt.sign(userDto(user), "supersecret")
    
    return encodeResult
  }
} 