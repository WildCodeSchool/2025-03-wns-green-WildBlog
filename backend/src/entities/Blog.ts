import { Entity, Column , BeforeInsert, BeforeUpdate, ManyToOne, Index } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity";
import slugify from 'slugify';
import { User } from "./User";


@Index(["author", "slug"], { unique: true }) // pour le slug unique par auteur et non global à l'appli (sur slug)
@Entity()
@ObjectType()
export class Blog extends BaseTimeEntity {

    @ManyToOne(() => User, user => user.blogs, { nullable: false })
    @Field(() => User)
    author: User; //FIXME: rendre automatiquement le user connecté comme auteur du blog

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
}
