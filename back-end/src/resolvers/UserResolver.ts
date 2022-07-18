import crypto from 'node:crypto';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string
  ) {
    const newUser = await this.repository.createUser({
      id: crypto.randomUUID(),
      name,
      email,
    })
    return newUser
  }
} 