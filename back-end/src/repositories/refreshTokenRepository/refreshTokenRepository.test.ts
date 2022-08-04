import { RefreshTokenRepository } from './refreshTokenRepository';
import { UserBuilder } from './../../infrastructure/builders/userBuilder';
import { refreshTokenExpirationTime } from '../../utils/variables';
import { prisma } from '../..';

describe('refreshTokenRepository', () => {
  test('It should create a refresh token', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()

    // Act
    const user = await new UserBuilder().insert()
    const newRefreshToken = await refreshTokenRepository.createRefreshToken(user.id, refreshTokenExpirationTime())
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        id: newRefreshToken.id
      }
    })

    // Assert
    expect(refreshToken).toBeTruthy()
    expect(newRefreshToken).toEqual(refreshToken)
  })

  test('It should get a refresh token by ID', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()

    // Act
    const user = await new UserBuilder().insert()
    const newRefreshToken = await refreshTokenRepository.createRefreshToken(user.id, refreshTokenExpirationTime())
    const refreshToken = await refreshTokenRepository.getRefreshTokenById(newRefreshToken.id)

    // Assert
    expect(refreshToken).toBeTruthy()
    expect(newRefreshToken).toEqual(refreshToken)
  })

  test('It should get a refresh token by user ID', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()

    // Act
    const user = await new UserBuilder().insert()
    const newRefreshToken = await refreshTokenRepository.createRefreshToken(user.id, refreshTokenExpirationTime())
    const refreshToken = await refreshTokenRepository.getRefreshTokenByUserId(user.id)

    // Assert
    expect(refreshToken).toBeTruthy()
    expect(newRefreshToken).toEqual(refreshToken)
  })

  test('It should delete a refresh token', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()

    // Act
    const user = await new UserBuilder().insert()
    const newRefreshToken = await refreshTokenRepository.createRefreshToken(user.id, refreshTokenExpirationTime())
    await refreshTokenRepository.deleteRefreshToken(user.id)

    const refreshToken = await refreshTokenRepository.getRefreshTokenById(newRefreshToken.id)

    // Assert
    expect(refreshToken).toBeFalsy()
  })

  test('It should renew a refresh token', async() => {
    // Arrange
    const refreshTokenRepository = new RefreshTokenRepository()

    // Act
    const user = await new UserBuilder().insert()
    const firstRefreshToken = await refreshTokenRepository.createRefreshToken(user.id, refreshTokenExpirationTime())
    const renewRefreshToken = await refreshTokenRepository.renewRefreshToken(firstRefreshToken.userId, refreshTokenExpirationTime())
    const secondRefreshToken = await refreshTokenRepository.getRefreshTokenByUserId(user.id)
    const firstRefreshTokenExists = await refreshTokenRepository.getRefreshTokenById(firstRefreshToken.id)

    // Assert
    expect(firstRefreshToken?.userId).toEqual(user.id)
    expect(secondRefreshToken?.userId).toEqual(user.id)
    expect(firstRefreshToken.id).not.toEqual(secondRefreshToken?.id)
    expect(firstRefreshTokenExists).toBeFalsy()
  })

})