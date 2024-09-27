import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { PostEntity } from "./index";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ length: 255 })
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({ default: false })
    isAdmin: boolean;

    // Один пользователь может иметь много постов
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];
}
