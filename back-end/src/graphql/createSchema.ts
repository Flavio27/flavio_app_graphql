import "reflect-metadata";
import path from "path"
import { buildSchema } from "type-graphql"
import { UserResolver } from "../resolvers/userResolver/UserResolver";
import { ProductResolver } from "../resolvers/productResolver/ProductResolver";
import { customAuthChecker } from "../utils/decodedToken";

export const createSchema = () => 
  buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver
    ],
    authChecker: customAuthChecker,
    authMode: "null",
    emitSchemaFile: path.resolve(__dirname, './schema.gql')
  }) 
