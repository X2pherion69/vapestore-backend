import * as joi from 'joi';

export class UpdateCommentDto {
  commentId: number;
  comment: string;
}

export const vUpdateCommentDto = joi.object<UpdateCommentDto>({
  commentId: joi.number().min(0).required(),
  comment: joi.string().min(1).max(50),
});

export const vDeleteCommentDto = joi.object<UpdateCommentDto>({
  commentId: joi.number().min(0).required(),
});
