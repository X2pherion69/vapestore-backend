import * as joi from 'joi';

export class UpdateProductDto {
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

export const vUpdateProductDto = joi.object<UpdateProductDto>({
  name: joi.string().max(50),
  description: joi.string().min(10).max(200),
  nicotine: joi.number().max(60),
  price: joi.number(),
  quantity: joi.number(),
  type: joi.string().max(20),
  origin: joi.string().max(20),
  volume: joi.number(),
  categoryId: joi.number().min(1),
});
