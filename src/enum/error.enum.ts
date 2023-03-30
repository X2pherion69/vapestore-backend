export enum ErrorMessageEnum {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
  INVALID_TOKEN = 'INVALID_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
}

export enum ErrorMessageDetailEnum {
  INTERNAL_SERVER_ERROR_DESCRIPTION = 'Internal server error',
  NOT_FOUND_DESCRIPTION = 'Not found the data requested',
  BAD_REQUEST_DESCRIPTION = 'Bad request',
  FIELD_TAKEN_DESCRIPTION = 'Field taken',
  INVALID_TOKEN_DESCRIPTION = 'Invalid token',
  UUID_IS_EXISTED = 'Uuid is existed',
  INVALID_VALUE = 'Invalid value',
  UNAUTHORIZED_DESCRIPTION = 'Unauthorized',
  EMAIL_IS_EXISTED = 'Email is existed',
  PHONE_NUMBER_IS_EXISTED = 'Phone number is existed',
  MORE_THAN_ONE_YEAR = 'Just can select from today back to 01 year ago',
  INVALID_DATE = 'Selected date is not valid',
  INVALID_ROLE = 'Invalid role',
  FORBIDDEN_DESCRIPTION = 'Forbidden',
  DATA_EXIST = 'This data has existed',
  CHARACTER_CONVENTION = 'Name can not contain special characters other than `.` and `_`',
}
