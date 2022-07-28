import "reflect-metadata";
import path from "path"
import { buildSchema } from "type-graphql"
import { UserResolver } from "../resolvers/userResolver/UserResolver";
import { ProductResolver } from "../resolvers/productResolver/ProductResolver";
import { RefreshTokenResolver } from "../resolvers/refreshTokenResolver/RefreshTokenResolver";
import { authChecker } from "../utils/authChecker";

export const createSchema = () => 
  buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver,
      RefreshTokenResolver
    ],
    authChecker: authChecker,
    authMode: "null",
    emitSchemaFile: path.resolve(__dirname, './schema.gql')
  }) 
