import "reflect-metadata";
import { ProductResolver } from './../resolvers/ProductResolver';
import path from "path"
import { buildSchema } from "type-graphql"
import { UserResolver } from "../resolvers/UserResolver"

export const createSchema = () => 
  buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver
    ],
    emitSchemaFile: path.resolve(__dirname, './schema.gql')
  }) 
