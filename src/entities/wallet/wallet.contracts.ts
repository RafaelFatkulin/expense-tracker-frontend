import { z } from 'zod';

export const WalletSchema = z.object({
  id: z.number(),
  title: z.string(),
  balance: z.number().nullish(),
  userId: z.number()
});

export const CreateWalletDtoSchema = z.object({
  title: z.string().min(4).max(48),
  userId: z.number()
});

export const UpdateWalletDtoSchema = z.object({
  title: z.string().min(4).max(48)
});
