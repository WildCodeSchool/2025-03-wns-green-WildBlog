import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";

@Entity()
@ObjectType()
export class Tag extends BaseTimeEntity {
  
  @Column({ unique: true })
  @Field(() => String)
  name: string;

}
