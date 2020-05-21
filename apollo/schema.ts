import { UserResolver } from './resolvers'
import { buildSchema } from 'type-graphql'

export async function getSchema() {
 return await buildSchema({
    resolvers: [UserResolver]
  });
}
