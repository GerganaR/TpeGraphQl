import { Resolver, Query } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {

    @Query(() => String)
  async helloWorld():Promise<string> {
    return 'Hello World'
  }

}
