import bcrypt from 'bcrypt';
import faker from 'faker';
import { randomUUID } from 'node:crypto';
import { prisma } from '../..';
import { User } from '../../models/User';

export class UserBuilder {
  private model = new User()

  constructor(){
    this.model.id = randomUUID()
    this.model.name = faker.name.findName()
    this.model.email = faker.internet.email()
    this.model.password = bcrypt.hashSync(faker.internet.password(), 3)
    this.model.confirmed = false
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

  withPassword(password: string) {
    this.model.password = bcrypt.hashSync(password, 3)
    return this
  }

  withConfirmed(confirmed: boolean) {
    this.model.confirmed = confirmed
    return this
  }

  async insert () {
    const user = prisma.user
    return await user.create({
      data: this.model
    })
  }
  
}