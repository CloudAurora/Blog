import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Post {
    @Field(type => Int)
    id!: number;

    @Field({nullable: true})
    content?: string

    @Field()
    published!: boolean;

    @Field()
    title!: string

    @Field(type => User, { nullable: true })
    author?: any 
}