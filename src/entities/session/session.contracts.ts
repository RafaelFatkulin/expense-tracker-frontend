import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  registrationDate: z.string()
});

export const UpdateUserDtoSchema = z.object({
  userId: z.number(),
  username: z.string().min(8).max(72)
});

export const SignupDtoSchema = z
  .object({
    username: z.string().min(8).max(72),
    email: z.string().email(),
    password: z.string().min(8).max(72),
    confirmPassword: z.string().min(8).max(72)
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword']
      });
    }
  });

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  remember: z.boolean()
});

export const TokenResponseSchema = z.object({
  token: z.string()
});
