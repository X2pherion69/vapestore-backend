import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { exceptionResponse } from '../interface';
import { ErrorMessageDetailEnum, ErrorMessageEnum } from '../../enum/error.enum';

class HttpError {
  public throwInternalServerError(errorLog?: any) {
    throw new HttpException(
      exceptionResponse.create(ErrorMessageEnum.INTERNAL_SERVER_ERROR, ErrorMessageDetailEnum.INTERNAL_SERVER_ERROR_DESCRIPTION, errorLog),
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  public throwExistedError(errorDetail = ErrorMessageDetailEnum.DATA_EXIST) {
    throw new HttpException(exceptionResponse.create(ErrorMessageEnum.BAD_REQUEST, errorDetail), StatusCodes.BAD_REQUEST);
  }

  public throwBadRequestError(errorDetail = ErrorMessageDetailEnum.BAD_REQUEST_DESCRIPTION) {
    throw new HttpException(exceptionResponse.create(ErrorMessageEnum.BAD_REQUEST, errorDetail), StatusCodes.BAD_REQUEST);
  }

  public throwNotFoundError() {
    throw new HttpException(
      exceptionResponse.create(ErrorMessageEnum.NOT_FOUND, ErrorMessageDetailEnum.NOT_FOUND_DESCRIPTION),
      StatusCodes.NOT_FOUND,
    );
  }

  public throwForbiddenError() {
    throw new HttpException(
      exceptionResponse.create(ErrorMessageEnum.FORBIDDEN, ErrorMessageDetailEnum.FORBIDDEN_DESCRIPTION),
      StatusCodes.FORBIDDEN,
    );
  }

  public throwUnAuthorizedError() {
    throw new HttpException(
      exceptionResponse.create(ErrorMessageEnum.UNAUTHORIZED, ErrorMessageDetailEnum.UNAUTHORIZED_DESCRIPTION),
      StatusCodes.UNAUTHORIZED,
    );
  }

  public throwNameConventionError() {
    throw new HttpException(
      exceptionResponse.create(ErrorMessageEnum.BAD_REQUEST, ErrorMessageDetailEnum.CHARACTER_CONVENTION),
      StatusCodes.BAD_REQUEST,
    );
  }
}

export const httpError = new HttpError();
