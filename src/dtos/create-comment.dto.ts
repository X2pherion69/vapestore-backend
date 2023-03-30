import * as joi from 'joi';

export class CreateCommentDto {
  username: string;
  comment: string;
  productId: number;
}

export const vCreateCommentDto = joi.object<CreateCommentDto>({
  username: joi.string().required().max(20),
  comment: joi.string().required().min(1).max(50),
  productId: joi.number().required().min(1),
});
