import { UserRepository } from './../../repositories/userRepository/userRepository';
import { decodedToken } from './../../utils/decodedToken';
import { ApolloServer } from 'apollo-server';
import { main, prisma } from '../..';
import { UserBuilder } from '../../infrastructure/builders/userBuilder';
import { RefreshTokenRepository } from '../../repositories/refreshTokenRepository/refreshTokenRepository';
import { User } from '../../models/User';
import { refreshTokenExpirationTime } from '../../utils/variables';

let server: ApolloServer

beforeAll( async () => {
  server = await main()
})

describe('RefreshTokenResolver.test', () => {
  test('It should return refresh token not exists', async() => {
    // Arrange

    const query = `query { refreshToken(id: "123456789-abcdefgh-987654321")}`

    // Act
    const { data, errors } = await server.executeOperation({
      query
    })

    // Assert
    expect(data).toBeFalsy()
    expect(errors).toBeTruthy()
    expect(errors![0].message).toEqual('Refresh token not exists')
  })

  test('It should renew a refresh token', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()
    const expiredRefreshTokenTime = 1627424012

    // Act
    const user = await new UserBuilder().insert()
    const refreshToken = await refreshTokenRepository.createRefreshToken(user.id, expiredRefreshTokenTime)

    const query = `query { refreshToken(id: "${refreshToken.id}")}`
    
    
    // Act
    const { data, errors } = await server.executeOperation({
      query
    })
    const decodedResult = decodedToken(data?.refreshToken) as User
    
    const newRefreshToken = await refreshTokenRepository.getRefreshTokenById(refreshToken.id)

    // Assert
    expect(errors).toBeFalsy()
    expect(newRefreshToken).toBeFalsy()
    expect(decodedResult.id).toEqual(user.id)

  })

  test('It should return token from refresh token', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()

    // Act
    const user = await new UserBuilder().insert()
    const refreshToken = await refreshTokenRepository.createRefreshToken(user.id, refreshTokenExpirationTime)

    const query = `query { refreshToken(id: "${refreshToken.id}")}`
    
    
    // Act
    const { data, errors } = await server.executeOperation({
      query
    })
    const decodedResult = decodedToken(data?.refreshToken) as User
    
    const newRefreshToken = await refreshTokenRepository.getRefreshTokenById(refreshToken.id)

    // Assert
    expect(errors).toBeFalsy()
    expect(newRefreshToken).toBeTruthy()
    expect(decodedResult.id).toEqual(refreshToken.userId)

  })


})