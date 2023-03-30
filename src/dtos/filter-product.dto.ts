import * as joi from 'joi';

export class FilterProductDto {
  name: string;
}

export const vFilterProductDto = joi.object<FilterProductDto>({
  name: joi.string().trim().allow('').failover('').required(),
});
