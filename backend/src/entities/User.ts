import { Entity, Column, OneToMany } from "typeorm"
import { Field, ID, ObjectType } from "type-graphql"
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity"
import { Blog } from "./Blog"
import { Post } from "./Post"
import { Comment } from "./Comment"
import { Role } from "../auth/roles.enum"

@Entity()
@ObjectType()
export class User extends BaseTimeEntity {

    @Column({ length: 100, nullable: false })
    @Field(() => String)
    firstName: string

    @Column({ length: 100, nullable: false })
    @Field(() => String)
    lastName: string

    @Column({ unique: true, nullable: false })
    @Field(() => String)
    email: string

    @Column({ length: 255, nullable:false })
    @Field(() => String)
    password: string

    @Column({ default: true })
    @Field()
    isActive: boolean

    @OneToMany(() => Blog, blog => blog.author)
    @Field(() => [Blog])
    blogs: Blog[];

    @OneToMany(() => Post, post => post.author)
    @Field(() => [Post])
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.author)
    @Field(() => [Comment])
    comments: Comment[];

    @Field(() => [Role])
    @Column({
      type: "enum",
      enum: Role,
      array: true,
      default: [Role.USER],
    })
    roles: Role[];

}
