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
      query: `query users { users { id name email password created_at } }`
    });
    const allUsers = await new UserRepository().getUsers()

    // Assert
    
    expect(result.data?.users).toEqual(JSON.parse(JSON.stringify(allUsers)))
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
                  password
                  created_at
                }
              }`
    });
    const user = await new UserRepository().getUserByID(newUser.id)

    // Assert
    expect(result.errors).toBe(undefined)
    expect(result.data?.userById).toEqual(JSON.parse(JSON.stringify(user)))
  });

  test("Should create a new user", async () => {
    // Arrange
    const server = await main()

    // Act
    const newUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

    const result = await server.executeOperation({
      query: `mutation {
        createUser(data: { email: "${newUser.email}", name: "${newUser.name}", password: "${newUser.password}" }) {
          email
          id
          name
          password
        }
      }
      `
    });

    // Assert
    expect(result.errors).toBe(undefined)
    expect(result.data?.createUser).toMatchObject(newUser)
  });

  test.each`
  name                           |   email                 | password
  ${'Aaaaaaaaabbbbbbbbbbccccc'}  |   ${'test@email.com'}   | ${'mFDJVqOJ7qLNGdo'}
  ${'Aaron Mraz'}                |   ${'aaaabbbccc'}       | ${'mFDJVqOJ7qLNGdo'}
  ${12345679}                    |   ${'test@email.com'}   | ${'mFDJVqOJ7qLNGdo'}
  ${'Aaaaaaaaabbbbbbbbbbccccc'}  |   ${'aaaabbbccc'}       | ${'mFDJVqOJ7qLNGdo'}   
  ${12123213}                    |   ${3123123123}         | ${'mFDJVqOJ7qLNGdo'}
  ${'a'}                         |   ${''}                 | ${'mFDJVqOJ7qLNGdo'}
  ${''}                          |   ${'a'}                | ${'mFDJVqOJ7qLNGdo'}     
  `
    ("Should return an error when try create a new user with wrong data", async ({ name, email, password }) => {
    // Arrange
    const server = await main()

    // Act
    const result = await server.executeOperation({
      query: `mutation {
        createUser(data: { email: "${name}", name: "${email}", password: "${password}" }) {
          email
          id
          name
        }
      }
      `
    });
  
    // Assert
    expect(result.errors).not.toBe(undefined)
    expect(result.errors?.length).toBeGreaterThan(0)
  });


 })
 