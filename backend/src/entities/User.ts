import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Field, ID, ObjectType } from "type-graphql"

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number

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

    @Column()
    @Field()
    isActive: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Field()
    updatedAt: Date;
}
