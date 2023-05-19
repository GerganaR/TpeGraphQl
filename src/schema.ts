import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from './typegoose-middleware'
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from './object-id.scalar'
import * as path from 'path'
import { HelloWorldResolver } from './resolvers/hello.resolver'

//TODO add resolves
//TODO add authChecker
export const getSchema = async () => {
  return await buildSchema({
    resolvers: [HelloWorldResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    authChecker: null,
  })
}
