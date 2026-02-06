import { Entity, Column, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@ObjectType()
export class Comment extends BaseTimeEntity {
  
  @Column({ type: 'text', nullable: false })
  @Field(() => String)
  content: string;

  @ManyToOne(() => Post, post => post.comments, { nullable: false, onDelete: "CASCADE" })
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, user => user.comments, { nullable: true })
  @Field(() => User, { nullable: true })
  author?: User;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  anonymousId?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  anonymousName?: string;
}