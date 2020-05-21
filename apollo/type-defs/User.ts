import { ObjectType, Field, Int } from 'type-graphql'
import { Post } from './Post';

@ObjectType()
export class User {
    @Field(type => Int)
    id!: number;
    
    @Field()
    email!: string;

    @Field({ nullable: true })
    name?: string;

    @Field(type => [Post])
    posts!: any[]
}