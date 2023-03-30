import { Injectable, PipeTransform, HttpException } from '@nestjs/common';
import { ObjectSchema, ValidationError } from 'joi';

@Injectable()
export class QueryJoiValidatorPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  private mapJoiError(err: ValidationError) {
    const errorObject = {};

    for (const item of err.details) errorObject[item.context.key] = item.message;
    return errorObject;
  }

  transform(input) {
    const { error, value } = this.schema.validate(input, { abortEarly: false });
    if (typeof input !== 'object') return input;
    if (error) throw new HttpException(this.mapJoiError(error), 400);
    return value;
  }
}
