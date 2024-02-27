import type { z } from 'zod';
import type {
  ChangeEmailDtoSchema,
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
export type ChangeEmailDto = z.infer<typeof ChangeEmailDtoSchema>;
