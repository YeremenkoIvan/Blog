import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./index";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    token: string;

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: "CASCADE" })
    user: User;
}
