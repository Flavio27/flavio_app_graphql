import { UserBuilder } from './userBuilder';
import { randomUUID } from 'node:crypto';
import { randomCode } from './../../utils/randomCode';
import { ConfirmUserType } from "../../models/ConfirmUser";
import { confirmEmailCodeExpirationTime } from '../../utils/variables';
import { prisma } from '../..';

export class ConfirmCodeBuilder {
  private model = new ConfirmUserType() 
  constructor() {
    this.model.id = randomUUID()
    this.model.code = randomCode()
    this.model.expiresIn = confirmEmailCodeExpirationTime
    this.model.userId = ''
  }

  withId(id: string){
    this.model.id = id;
    return this
  }

  withCode(code: number){
    this.model.code = code;
    return this
  }

  withExpiresIn(expiresIn: number){
    this.model.expiresIn = expiresIn;
    return this
  }

  withUserId(userId: string){
    this.model.userId = userId;
    return this
  }

  async insert(){
    const confirmCode = await prisma.confirmLoginCode

    if (!!!this.model.userId){
      const user = await new UserBuilder().insert()
      this.model.userId = user.id
    }

    return await confirmCode.create({
      data: this.model
    })
  }
}