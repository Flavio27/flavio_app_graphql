import { confirmEmailCodeExpirationTime } from './../../utils/variables';
import { randomCode } from './../../utils/randomCode';
import { UserBuilder } from './../../infrastructure/builders/userBuilder';
import { ConfirmUserRepository } from './confirmUserRepository';
import { ConfirmCodeBuilder } from './../../infrastructure/builders/confirmCodeBuilder';
describe('confirmUserRepository.test', () => {

  test('It should get a confirm code by userId', async() => {
    const newConfirmCode = await new ConfirmCodeBuilder().insert()
    const confirmCode = await new ConfirmUserRepository().getConfirmationByUserId(newConfirmCode.userId)
    expect(newConfirmCode).toEqual(confirmCode)
  })

  test('It should get confirm code By userId and code', async() => {
    const newConfirmCode = await new ConfirmCodeBuilder().insert()
    const confirmCode = await new ConfirmUserRepository()
    .getConfirmationByUserIdAndCode(newConfirmCode.userId, newConfirmCode.code)

    expect(newConfirmCode).toEqual(confirmCode)
  })

  test('It should create a confirm code', async() => {
    const user = await new UserBuilder().insert()
    const newConfirmCode = await new ConfirmUserRepository()
    .createConfirmCode(user.id, randomCode(), confirmEmailCodeExpirationTime)

    const confirmCode = await new ConfirmUserRepository()
    .getConfirmationByUserId(newConfirmCode.userId)

    expect(newConfirmCode).toEqual(confirmCode)
  })
})