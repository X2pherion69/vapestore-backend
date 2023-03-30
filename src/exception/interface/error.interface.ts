import { ErrorMessageEnum, ErrorMessageDetailEnum } from 'src/enum/error.enum';

export interface ErrorBody {
  errorMessage: ErrorMessageEnum;
  errorDetail: ErrorMessageDetailEnum;
  errorLog?: any;
}
