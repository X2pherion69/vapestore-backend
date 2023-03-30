import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dtos';
import { httpError } from 'src/exception/httpErrors';
import { PagingResult } from 'src/interfaces';
import { Comment } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  private readonly alias = 'Comment';

  async getListComment(id: number, isDeleted = false): Promise<PagingResult<Comment>> {
    const query = this.commentRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.product_id = :id`, { id });
    const listCommentFromAProduct = await query.getMany();
    const count = await query.getCount();
    return { data: listCommentFromAProduct, count };
  }

  async createComment(data: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(data);
    return await this.commentRepository.save(comment);
  }

  async updateComment(productId: number, commentId: number, comment: string, isDeleted = false) {
    const newComment = new Comment();
    newComment.comment = comment;

    const oldComment = await this.commentRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.product_id = :productId`, { productId })
      .andWhere(`${this.alias}.id = :commentId`, { commentId })
      .getOne();

    if (!oldComment) httpError.throwNotFoundError();

    Object.assign(oldComment, newComment);

    return await this.commentRepository.save(oldComment);
  }

  async deleteComment(productId: number, commentId: number, isDeleted = false) {
    const comment = await this.commentRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.product_id = :productId`, { productId })
      .andWhere(`${this.alias}.id = :commentId`, { commentId })
      .getOne();
    if (!comment) httpError.throwNotFoundError();
    return await this.commentRepository.remove(comment);
  }
}
