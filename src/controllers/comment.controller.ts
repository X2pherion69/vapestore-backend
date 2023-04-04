import { Body, Controller, Get, Param, Post, Patch, UsePipes, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { httpError } from '../exception/httpErrors';
import { StatusCodes } from 'http-status-codes';
import { CommentService } from '../services';
import { PagingResult } from '../interfaces';
import { Comment } from '../models';
import { CreateCommentDto, vCreateCommentDto } from '../dtos';
import { QueryJoiValidatorPipe } from '../pipes/queryValidator.pipe';
import { UpdateCommentDto, vDeleteCommentDto, vUpdateCommentDto } from '../dtos/update-comment.dto';
import { Response } from 'express';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Unprotected()
  @Get('/:id')
  async getListComment(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response<PagingResult<Comment>>> {
    let comments: PagingResult<Comment>;
    try {
      comments = await this.commentService.getListComment(id);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(comments.data.length !== 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT).send(comments);
  }
  @Unprotected()
  @Post('/')
  @UsePipes(new QueryJoiValidatorPipe(vCreateCommentDto))
  async createComment(@Body() body: CreateCommentDto, @Res() res: Response): Promise<Response<Comment>> {
    let comment: Comment;
    try {
      comment = await this.commentService.createComment(body);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.CREATED).send(comment);
  }
  @Unprotected()
  @Patch('/:id')
  @UsePipes(new QueryJoiValidatorPipe(vUpdateCommentDto))
  async updateComment(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: UpdateCommentDto,
    @Res() res: Response,
  ): Promise<Response<Comment>> {
    let comment: Comment;
    const { commentId, comment: commentResponse } = body;
    try {
      comment = await this.commentService.updateComment(productId, commentId, commentResponse);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.CREATED).send(comment);
  }
  @Unprotected()
  @Delete('/:id')
  @UsePipes(new QueryJoiValidatorPipe(vDeleteCommentDto))
  async deleteComment(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: Pick<UpdateCommentDto, 'commentId'>,
    @Res() res: Response,
  ): Promise<Response<Comment>> {
    try {
      await this.commentService.deleteComment(productId, body.commentId);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}
