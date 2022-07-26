import './infrastructure/dotenv'
import { createSchema } from './graphql/createSchema';
import { ApolloServer } from "apollo-server"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()
const port = process.env.APP_PORT || 4000
const schema = createSchema()

export const main = async () => {
  const schema = await createSchema()

  const server = new ApolloServer({
    schema, 
    context: ({ req }) => {
      const context = {
        prisma,
        req
      }

      return context
    }
  })

  if (process.env.NODE_ENV === 'test') {
    return server
  }
  
  server.listen({ port }, () => console.log(`Server running at http://localhost:${port} 🔥`))
  return server
}


main();