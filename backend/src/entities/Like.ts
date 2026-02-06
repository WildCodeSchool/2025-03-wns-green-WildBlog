import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique, Column } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";


@ObjectType()
@Entity()
@Unique(["user", "post"]) // Pour les utilisateurs connectés
@Unique(["anonymousId", "post"]) // Pour les utilisateurs anonymes
export class Like {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { eager: true, nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  anonymousId?: string; // Identifiant unique pour les utilisateurs anonymes

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post: Post;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}