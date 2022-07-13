import { User } from './../models/User';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from 'node:crypto'


@Resolver()
export class UserResolver {
  private data: User[] = []

  @Query(() => [User])
  async users() {
    return this.data
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string
  ) {
    const user = {id: crypto.randomUUID(), name: name, email}
    this.data.push(user)

    return user
  }
} 