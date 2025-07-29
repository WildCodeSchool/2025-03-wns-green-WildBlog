import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    firstName: string

    @Column({ length: 100, nullable: false })
    lastName: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ length: 255, nullable:false })
    password: string

    @Column()
    isActive: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}