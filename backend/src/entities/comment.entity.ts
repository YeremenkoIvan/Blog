import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn
} from "typeorm";
import { User, PostEntity } from "./index";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => PostEntity, (post) => post.comments, { eager: true })
    post: PostEntity;

    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    user: User;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
