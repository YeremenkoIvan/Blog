import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { CommentsService } from "../services/index";
import { Comment } from "../entities/index";

@Controller("posts/comments")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async createComment(
        @Body("postId") postId: number,
        @Body("userId") userId: number, // предположим, что userId передается в теле запроса
        @Body("content") content: string
    ): Promise<Comment> {
        return this.commentsService.createComment(userId, postId, content);
    }

    @Get()
    async getCommentsByPost(
        @Body("postId") postId: number
    ): Promise<Comment[]> {
        return this.commentsService.getCommentsByPost(postId);
    }
}
