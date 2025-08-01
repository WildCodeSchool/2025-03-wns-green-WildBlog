import { Entity, Column, OneToMany, ManyToOne, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm"
import { Field, ObjectType } from "type-graphql"
import { BaseTimeEntity } from "../common/entities/BaseTimeEntity"
import { Blog } from "./Blog"
import { User } from "./User";
import slugify from "slugify";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class Post extends BaseTimeEntity {

    @ManyToOne(() => User, user => user.posts, { nullable: false })
    @Field(() => User)
    author: User; //FIXME: rendre automatiquement le user connecté comme auteur du blog

    @ManyToOne(() => Category, category => category.posts, { nullable: false })
    @Field(() => Category)
    category: Category; 

    @Column({ length: 100, nullable: false })
    @Field(() => String)
    title: string

    @Column({ nullable: false, unique: true })
    @Field(()=> String)
    slug: string

    @Column({ type: 'text', nullable: false })
    @Field(() => String)
    content: string

    // à ajouter à la création :import sanitizeHtml from "sanitize-html"; // --> voir doc:  https://www.npmjs.com/package/sanitize-html/v/2.10.0

    @Column({ nullable: true })
    @Field({ nullable: true })
    coverImage: string;

    @Column({ type: "timestamp" , nullable: true})
    @Field()
    publicationStartDate: Date;

    @Column({ type: "timestamp", nullable: true })
    @Field()
    publicationEndDate: Date;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
      this.slug = slugify(this.title, { lower: true });
    }

    @ManyToMany(() => Tag, tag => tag.posts )
    @JoinTable()
    @Field(() => [Tag])
    tags: Tag[]


}
