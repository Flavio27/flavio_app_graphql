import { User } from './../models/User';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from 'node:crypto'
import { prisma } from '..';


@Resolver()
export class UserResolver {
  private data: User[] = []

  @Query(() => [User])
  async users() {
    const allUsers = await prisma.user.findMany()
    return allUsers
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string
  ) {
    const user = {id: crypto.randomUUID(), name: name, email}
    this.data.push(user)

    await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
      }
    })


    return user
  }
} 