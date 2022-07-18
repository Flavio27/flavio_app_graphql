import "reflect-metadata";
import path from "path"
import { buildSchema } from "type-graphql"
import { UserResolver } from "../resolvers/UserResolver"

export const createSchema = () => 
  buildSchema({
    resolvers: [
      UserResolver
    ],
    emitSchemaFile: path.resolve(__dirname, './schema.gql')
  }) 
