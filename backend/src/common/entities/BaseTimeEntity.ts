import { BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
  
@ObjectType()
    export abstract class BaseTimeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Field()
    updatedAt: Date;
}
  