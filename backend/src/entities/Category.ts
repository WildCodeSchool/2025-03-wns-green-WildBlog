import {
    Entity,
    Column,
    OneToMany,
  } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
import { Post } from "./Post";
  
  @Entity()
  @ObjectType()
  export class Category extends BaseTimeEntity {
  
    @Column({ unique: true })
    @Field(() => String)
    name: string;

    @Column({ default: "" })
    @Field(() => String)
    description: string;

    @OneToMany(() => Post, post => post.category)
    @Field(() => [Post])
    posts: Post[];
  }
  