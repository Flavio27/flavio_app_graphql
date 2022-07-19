import crypto from 'node:crypto';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserInput } from '../models/User.validate';
import { UserRepository } from '../repositories/userRepository/userRepository';
import { User } from './../models/User';


@Resolver()
export class UserResolver {
  private repository = new UserRepository()

  @Query(() => [User])
  async users() {
    const allUsers = await this.repository.getUsers()
    return allUsers
  }

  @Query(() => User)
  async userById(
    @Arg('id') id: string
  ) {
    const user = await this.repository.getUserByID(id)
    return user
  }

  @Mutation(() => User)
  async createUser(@Arg("data")
  {
    name,
    email,
    password,
  }: UserInput): Promise<User> {
    const newUser = await this.repository.createUser({
      id: crypto.randomUUID(),
      name,
      email,
      password,
      created_at: new Date()
    })
    return newUser
  }
} 