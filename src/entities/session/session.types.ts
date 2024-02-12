import type { z } from 'zod';
import type {
  CheckEmailDtoSchema,
  CheckEmailResponseSchema,
  CheckUsernameDtoSchema,
  CheckUsernameResponseSchema,
  LoginDtoSchema,
  SignupDtoSchema,
  TokenResponseSchema,
  UpdateUserDtoSchema,
  UserSchema
} from './session.contracts';

export type User = z.infer<typeof UserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
export type SignupDto = z.infer<typeof SignupDtoSchema>;
export type LoginDto = z.infer<typeof LoginDtoSchema>;
export type Token = z.infer<typeof TokenResponseSchema>;
export type CheckUsernameDto = z.infer<typeof CheckUsernameDtoSchema>;
export type CheckUsernameResponse = z.infer<typeof CheckUsernameResponseSchema>;
export type CheckEmailDto = z.infer<typeof CheckEmailDtoSchema>;
export type CheckEmailResponse = z.infer<typeof CheckEmailResponseSchema>;
