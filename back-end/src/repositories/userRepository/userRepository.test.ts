import { randomUUID } from "crypto";
import faker from "faker";
import { User } from "../../models/User";
import { UserBuilder } from "../../infrastructure/builders/userBuilder";
import { UserRepository } from "./userRepository";

describe('UserRepository', () => {
  test('It should create new a user', async() => {
    // Arrange
    const newUserData: User = {
      id: randomUUID(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }

    // Act
    const newUser = await new UserRepository().createUser(newUserData)
    const user = await new UserRepository().getUserByID(newUser.id)

    // Assert
    expect(user).not.toBe(null)
    expect(user).not.toBe(undefined)
    expect(newUser).toEqual(newUserData)
    expect(newUser).toEqual(user)

  });

  test('It should returns all users', async () => {
    // Arrange
    const allUsers = await new UserRepository().getUsers()

    // Assert
    expect(allUsers).not.toBe(null)
    expect(allUsers).not.toBe(undefined)
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
    expect(newUser).toEqual(user)

  });
})
