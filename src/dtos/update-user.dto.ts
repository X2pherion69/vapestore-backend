export class UpdateUserDto {
  name: string;
  phone: string;
  email: string;
  address: string;
}

// export const vUpdateUserDto = joi.object<UpdateUserDto>({
//     name: joi.string().required().max(50),
//     phone: joi.string().required().max(17),
//     email: joi.string().required().max(20),
//     address: joi.string().required().max(100)
// });
