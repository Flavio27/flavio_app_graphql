import { UserBuilder } from './../../infrastructure/builders/userBuilder';
import { ConfirmUserRepository } from './../../repositories/confirmUserRepository/confirmUserRepository';
import { UserRepository } from './../../repositories/userRepository/userRepository';
import { ConfirmCodeBuilder } from './../../infrastructure/builders/confirmCodeBuilder';
import { ApolloServer } from 'apollo-server';
import { main } from '../..';


let server: ApolloServer
const expiredTime = 1627424012

beforeAll( async () => {
  server = await main()
})

describe(('ConfirmEmailResolver'), () => {

  test('It should confirm a user email', async () => {
    // Arrange
    const { code, userId } = await new ConfirmCodeBuilder().insert()

    const query = `
    query confirmEmail {
      confirmEmail(code: ${code}, userId: "${userId}")
    }
    `

    // Act
    const result = await server.executeOperation({
      query
    })

    // Arrange 
    const user = await new UserRepository().getUserByID(userId)
    const confirmCode = await new ConfirmUserRepository().getConfirmationByUserId(userId)

    // Assert
    expect(result).toBeTruthy()
    expect(user?.confirmed).toBeTruthy()
    expect(confirmCode).toBeFalsy()
  })

  test('It should return "invalid code"', async () => {
    // Arrange
    const { userId } = await new ConfirmCodeBuilder().insert()

    const query = `
    query confirmEmail {
      confirmEmail(code: ${123456}, userId: "${userId}")
    }
    `

    // Act
    const {data, errors} = await server.executeOperation({
      query
    })

    // Assert
    expect(data).toBeFalsy()
    expect(errors).toBeTruthy()
    expect(errors![0].message).toEqual('Invalid code')
  })

  test('It should return "This code confirmation expired. Please request a new code"', async () => {
    // Arrange
    const { userId, code } = await new ConfirmCodeBuilder()
    .withExpiresIn(expiredTime)
    .insert()

    const query = `
    query confirmEmail {
      confirmEmail(code: ${code}, userId: "${userId}")
    }
    `

    // Act
    const { data, errors } = await server.executeOperation({
      query
    })

    // Assert
    expect(data).toBeFalsy()
    expect(errors).toBeTruthy()
    expect(errors![0].message).toEqual('This code confirmation expired. Please request a new code')
  })

  test('It should return "This user email already confirmed"', async () => {
    // Arrange
    const user = await new UserBuilder()
    .withConfirmed(true)
    .insert()

    const { code } = await new ConfirmCodeBuilder()
    .withUserId(user.id)
    .insert()

    const query = `
    query confirmEmail {
      confirmEmail(code: ${code}, userId: "${user.id}")
    }
    `

    // Act
    const { data, errors } = await server.executeOperation({
      query
    })

    // Arrange
    const oldConfirmationCode = await new ConfirmUserRepository()
    .getConfirmationByUserIdAndCode(user.id, code)  

    // Assert
    expect(data).toBeFalsy()
    expect(errors).toBeTruthy()
    expect(errors![0].message).toEqual('This user email already confirmed')
    expect(oldConfirmationCode).toBeFalsy()
  })

  test('It should renew a confirmation code', async () => {
    // Arrange
    const { code, userId } = await new ConfirmCodeBuilder()
    .withExpiresIn(expiredTime)
    .insert()

    const query = `
      query renewConfirmEmailCode {
        renewConfirmCode(userId: "${userId}")
        }
    `

    // Act
    const result = await server.executeOperation({
      query
    })

    // Arrange
    const oldConfirmationCode = await new ConfirmUserRepository()
    .getConfirmationByUserIdAndCode(userId, code)

    // Assert
    expect(result).toBeTruthy()
    expect(oldConfirmationCode).toBeFalsy()
  })

  test('It should return "The previous confirmation code does not expire yet, please check your email"', async () => {
    // Arrange
    const { userId } = await new ConfirmCodeBuilder()
    .insert()

    const query = `
      query renewConfirmEmailCode {
        renewConfirmCode(userId: "${userId}")
        }
    `

    // Act
    const {data, errors} = await server.executeOperation({
      query
    })

    // Assert
    expect(data).toBeFalsy()
    expect(errors).toBeTruthy()
    expect(errors![0].message).toEqual('The previous confirmation code does not expire yet, please check your email')
  })

})