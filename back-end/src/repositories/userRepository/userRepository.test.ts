import { randomUUID } from "crypto";
import faker from "faker";
import { User } from "../../models/User";
import { UserBuilder } from "../../infrastructure/builders/userBuilder";
import { UserRepository } from "./userRepository";
import { prisma } from "../..";
import { userDto } from "../../dtos/userDto";

describe('UserRepository', () => {
  test('It should create new a user', async() => {
    // Arrange
    const newUserData: User = {
      id: randomUUID(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: new Date()
    }

    // Act
    const newUser = await new UserRepository().createUser(newUserData)
    const user = await new UserRepository().getUserByID(newUser.id)

    // Assert
    expect(user).not.toBe(null)
    expect(user).not.toBe(undefined)
    expect(newUser).toEqual(newUserData)
    expect(newUser.email).toEqual(user?.email)

  });

  test('It should returns all users', async () => {
    // Arrange
    const allUsers = await new UserRepository().getUsers()
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      }
    })

    // Assert
    expect(allUsers).not.toBe(null)
    expect(allUsers).not.toBe(undefined)
    expect(allUsers).toEqual(users)
  });

  test('It should get a user by ID', async () => {
    const newUser = await new UserBuilder()
    .withId(randomUUID())
    .withName(faker.name.findName())
    .withEmail(faker.internet.email())
    .insert()

    // Act
    const user = await new UserRepository().getUserByID(newUser.id)

    // Assert
    expect(userDto(newUser)).toEqual(user)

  });
})
