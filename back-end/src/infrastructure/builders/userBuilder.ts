import { randomUUID } from 'node:crypto';
import { User } from '../../models/User';
import faker from 'faker';
import { prisma } from '../..';

export class UserBuilder {
  private model = new User()

  constructor(){
    this.model.id = randomUUID()
    this.model.name = faker.name.findName()
    this.model.email = faker.internet.email()
  }

  withId(id: string) {
    this.model.id = id
    return this
  }

  withName(name: string) {
    this.model.name = name
    return this
  }

  withEmail(email: string) {
    this.model.email = email
    return this
  }

  async insert () {
    const user = prisma.user
    return await user.create({
      data: this.model
    })
  }
  
}