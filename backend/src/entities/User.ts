import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Field, ID, ObjectType } from "type-graphql"
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity"
import { Blog } from "./Blog"

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

    @Column()
    @Field()
    isActive: boolean

    @OneToMany(() => Blog, blog => blog.author)
    @Field(() => [Blog])
    blogs: Blog[];

}
