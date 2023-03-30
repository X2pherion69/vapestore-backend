import * as joi from 'joi';

export class CreateProductDto {
  name: string;
  price: number;
  type: string;
  origin: string;
  description: string;
  nicotine: number;
  volume: number;
  quantity: number;
  categoryId: number;
}

export const vCreateProductDto = joi.object<CreateProductDto>({
  name: joi.string().required().max(50),
  description: joi.string().required().min(10).max(200),
  price: joi.number().required(),
  quantity: joi.number().required(),
  nicotine: joi.number().max(60),
  type: joi.string().max(20),
  origin: joi.string().max(20),
  volume: joi.number(),
  categoryId: joi.number().min(1).required(),
});
