import {
  Entity,
  Column,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
import { Post } from "./Post";

@Entity()
@ObjectType()
export class Tag extends BaseTimeEntity {
  
  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @ManyToMany(() => Post, post => post.tags)
  posts: Post[];

}
