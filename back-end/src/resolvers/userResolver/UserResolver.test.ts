import { ApolloServer } from 'apollo-server';
import faker from 'faker';
import { main } from "../../";
import { UserBuilder } from "../../infrastructure/builders/userBuilder";
import { ClientUser } from '../../models/User';
import { UserRepository } from "../../repositories/userRepository/userRepository";
import { AxiosGraphql } from '../../utils/axiosRequest';
import { decodedToken } from '../../utils/decodedToken';
import { jsonParser } from '../../utils/jsonParser';

let server: ApolloServer

beforeAll( async () => {
  server = await main()
})

describe('UserResolver.ts', () => {
  test("It should verify server health", async () => {
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
 
  test("It should get all users from query with token", async () => {
    // Arrange
    const userEmail = faker.internet.email()
    const userPass = faker.internet.password()

    await new UserBuilder()
    .withEmail(userEmail)
    .withPassword(userPass)
    .withConfirmed(true)
    .insert()

    const login = await server.executeOperation({
      query: `query login{
        userLogin(data: {
          email: "${userEmail}",
          password: "${userPass}"
        }){
          token,
          refreshToken {
            id
            userId
            expiresIn
          }
        }
      }`,
    });

    const userToken = login.data?.userLogin?.token

    // Act
    const query = `
      query {
        users {
          id
          name
          email
          created_at
          }
        }
      `
    
    const result = await AxiosGraphql({ query, token: userToken })
    const allUsers = await new UserRepository().getUsers()

    // Assert
    expect(result.data.data.users).toEqual(jsonParser(allUsers))
  });

  test("It return token is missing when get all Users without token", async () => {
    // Arrange
    const query = `
      query {
        users {
          id
          name
          email
          created_at
          }
        }
      `
    
    const result = await AxiosGraphql({ query })

    // Assert
    expect(result.data.errors[0].message).toEqual('Token is missing')
  });

  test("It Should get user by ID", async () => {
    // Act
    const newUser = await new UserBuilder()
    .withConfirmed(true)
    .insert()
   
    const result = await server.executeOperation({
      query: `query userById {
                userById(id: "${newUser.id}") {
                  id
                  name
                  email
                  created_at
                }
              }`
    });
    const user = await new UserRepository().getUserByID(newUser.id)

    // Assert
    expect(result.errors).toBe(undefined)
    expect(result.data?.userById?.email).toBeTruthy()
    expect(result.data?.userById?.email).toEqual(user?.email)
    expect(result.data?.userById?.id).toEqual(user?.id)
  });

  test("It should create a new user", async () => {

    // Act
    const newUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

    const result = await server.executeOperation({
      query: `mutation {
        createUser(data: { email: "${newUser.email}", name: "${newUser.name}", password: "${newUser.password}" })
      }
      `
    });

    // Assert
    expect(result.errors).toBe(undefined)
    const decodedResult = decodedToken(result.data?.createUser) as ClientUser
    const user = await new UserRepository().getUserByEmail(decodedResult.email)

    expect(user?.email).toEqual(newUser.email)
    expect(decodedResult.email).toEqual(newUser.email)
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
    ("It should return an error when try create a new user with wrong data", async ({ name, email, password }) => {
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
    expect(result.errors).toBeTruthy()
    expect(result.errors?.length).toBeGreaterThan(0)
  });

  test("It should do a user login", async () => {
    // Arrange
    const password = 'PasswordTest123'
    const newUser = await new UserBuilder()
    .withPassword(password)
    .withConfirmed(true)
    .insert()

    const query = `
      query {
        userLogin(data: {
          email: "${newUser.email}",
         password: "${password}"
        }){
          token,
          refreshToken {
            id
            userId
            expiresIn
          }
        }
      }
    `

    // Act
    const { data, errors } = await server.executeOperation({
      query
    })
    
    const decodedData = decodedToken(data?.userLogin?.token) as ClientUser

    // Assert
    expect(errors).toBeFalsy()
    expect(decodedData.email).toEqual(newUser.email)
  })

})
 