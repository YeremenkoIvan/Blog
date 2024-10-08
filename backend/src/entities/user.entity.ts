import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { PostEntity, Token, Comment } from "./index";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ length: 255, unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => Comment, (comments) => comments.user) // Добавьте это
    comments: Comment[];

    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[];
}
