import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
  } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
import { Post } from "./Post";
import { Blog } from "./Blog";
  
  @Entity()
  @ObjectType()
  export class Category extends BaseTimeEntity {
  
    @Column()
    @Field(() => String)
    name: string;

    @Column({ type: "text", nullable: true })
    @Field(() => String, { nullable: true })
    description: string;

    @OneToMany(() => Post, post => post.category)
    @Field(() => [Post])
    posts: Post[];

    @ManyToOne(() => Blog, blog => blog.categories, { nullable: false })
    @Field(() => Blog)
    blog: Blog;
  }
  