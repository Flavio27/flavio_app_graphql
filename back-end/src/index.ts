import "reflect-metadata";

import path from "path"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { UserResolver } from './resolvers/UserResolver';
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

async function main() {
  const port = process.env.APP_PORT || 4000
  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql') // Este arquivo é onde é gerado os schemas automaticamente
  }) 


  const server = new ApolloServer({
    schema, context: { prisma }
  })

  await server.listen({ port }, () => console.log(`Server running at http://localhost:${port} 🔥`)
  )
}


main();