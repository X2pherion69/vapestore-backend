import { ErrorMessageEnum, ErrorMessageDetailEnum } from '../../enum/error.enum';

export interface ErrorBody {
  errorMessage: ErrorMessageEnum;
  errorDetail: ErrorMessageDetailEnum;
  errorLog?: any;
}
