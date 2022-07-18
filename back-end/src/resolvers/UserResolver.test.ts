import faker from 'faker';
import { main } from "..";
import { UserBuilder } from "../infrastructure/builders/userBuilder";
import { UserRepository } from "../repositories/userRepository/userRepository";

describe('dummy', () => {
  test("Should verify server health", async () => {
    // Arrange
    const server = await main()

    // Act
    const result = await server.executeOperation({
      query: ''
    });

    // Assert
    expect(result).toBeTruthy();
    expect(result.errors).toBeTruthy();
  });
 
  test("Should get all users from query", async () => {
    // Arrange
    const server = await main()

    // Act
    const result = await server.executeOperation({
      query: `query users { users { id name email } }`
    });
    const allUsers = await new UserRepository().getUsers()

    // Assert
    expect(result.data?.users).toEqual(allUsers)
  });

  test("Should get user by ID", async () => {
    // Arrange 
    const server = await main()

    // Act
    const newUser = await new UserBuilder()
   .insert()
   
    const result = await server.executeOperation({
      query: `query userById {
                userById(id: "${newUser.id}") {
                  id
                  name
                 email
                }
              }`
    });
    const user = await new UserRepository().getUserByID(newUser.id)

    // Assert
    expect(result.errors).toBe(undefined)
    expect(result.data?.userById).toEqual(user)
  });

  test("Should create a newUser", async () => {
    // Arrange
    const server = await main()

    // Act
    const newUser = {
    name: faker.name.findName(),
    email: faker.internet.email()
  }

    const result = await server.executeOperation({
      query: `mutation {
        createUser(email: "${newUser.email}", name: "${newUser.name}") {
          email
          id
         name
        }
      }
      `
    });

    // Assert
    expect(result.errors).toBe(undefined)
    expect(result.data?.createUser).toMatchObject(newUser)
  });
 })
 