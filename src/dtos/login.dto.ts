import * as joi from 'joi';

export class LoginDTO {
  username: string;
  password: string;
}

export const vLoginDTO = joi.object<LoginDTO>({
  username: joi.string().trim().min(5).max(20).required(),
  password: joi.string().trim().required(),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
});
