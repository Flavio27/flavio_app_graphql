import "reflect-metadata";
import path from "path"
import { buildSchema } from "type-graphql"
import { UserResolver } from "../resolvers/userResolver/UserResolver";
import { ProductResolver } from "../resolvers/productResolver/ProductResolver";

export const createSchema = () => 
  buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver
    ],
    emitSchemaFile: path.resolve(__dirname, './schema.gql')
  }) 
