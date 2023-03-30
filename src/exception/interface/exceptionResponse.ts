import { ErrorMessageEnum, ErrorMessageDetailEnum } from 'src/enum/error.enum';
import { ErrorBody } from './error.interface';

class ExceptionResponse {
  public create(errorMessage: ErrorMessageEnum, errorDetail: ErrorMessageDetailEnum, errorLog?: any): { errorBody: ErrorBody } {
    const errorBody: ErrorBody = { errorMessage, errorDetail, errorLog };
    return { errorBody };
  }
}

export const exceptionResponse = new ExceptionResponse();
