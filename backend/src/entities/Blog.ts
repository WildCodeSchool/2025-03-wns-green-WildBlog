import { Entity, Column , BeforeInsert, BeforeUpdate, ManyToOne, Index, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
import slugify from 'slugify';
import { User } from "./User";
import { Category } from "./Category";
import { Post } from "./Post";


@Index(["slug"], { unique: true }) // pour le slug unique globalement
@Entity()
@ObjectType()
export class Blog extends BaseTimeEntity {

    @ManyToOne(() => User, user => user.blogs, { nullable: false })
    @Field(() => User)
    author: User; //FIXME: le créateur du blog-> doit avoir le rôle super admin à la création

    @Column({ length: 100, nullable: false })
    @Field(() => String)
    name: string

    @Column({ nullable: false })
    @Field(()=> String)
    slug: string

    @Column({ length: 1000, nullable: true })
    @Field(() => String)
    description: string

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
      this.slug = slugify(this.name, { lower: true });
    }

    @OneToMany(() => Category, category => category.blog)
    @Field(() => [Category])
    categories: Category[];

    @OneToMany(() => Post, post => post.blog)
    @Field(() => [Post])
    posts: Post[];

}
