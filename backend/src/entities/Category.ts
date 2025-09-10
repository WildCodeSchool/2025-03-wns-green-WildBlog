import {
    Entity,
    Column,
  } from "typeorm";
  import { ObjectType, Field, ID } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
  
  @Entity()
  @ObjectType()
  export class Category extends BaseTimeEntity {
  
    @Column({ unique: true })
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;
  }
  