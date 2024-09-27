import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn
} from "typeorm";
import { User } from "./index";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column({ length: 100 })
    category: string;

    @Column({ length: 255 })
    tags: string;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // Много постов может принадлежать одному пользователю
    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}
