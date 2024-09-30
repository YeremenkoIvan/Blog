import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, PostEntity, Comment } from "../entities/index";
@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    async createComment(
        userId: number,
        postId: number,
        content: string
    ): Promise<Comment> {
        const user = await this.userRepository.findOneBy({ id: userId });
        const post = await this.postRepository.findOneBy({ id: postId });

        if (!user || !post) {
            throw new Error("User or Post not found");
        }

        const comment = this.commentRepository.create({ content, user, post });
        return this.commentRepository.save(comment);
    }

    async getCommentsByPost(postId: number): Promise<Comment[]> {
        return this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ["user"]
        });
    }
}
