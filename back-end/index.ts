import "reflect-metadata";

import path from "path"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { UserResolver } from './src/resolvers/UserResolver';

async function main() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql') // Este arquivo é onde é gerado os schemas automaticamente
  }) 

  const server = new ApolloServer({
    schema,
  })

  const { url } = await server.listen()
  console.log(`Server running at ${url} 🔥`)
}


main();