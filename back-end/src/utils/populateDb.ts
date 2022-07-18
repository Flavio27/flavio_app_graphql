import { UserBuilder } from "../infrastructure/builders/userBuilder"

async function populate() {
  const userBuilder = new UserBuilder()
  return await userBuilder.insert()
}

populate()