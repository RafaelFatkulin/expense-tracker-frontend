import { z } from 'zod';

export const WalletSchema = z.object({
  id: z.number(),
  title: z.string(),
  balance: z.number().nullish(),
  userId: z.number()
});

export const CalendarDataSchema = z.object({
  day: z.string(),
  value: z.number()
});

export const CreateWalletDtoSchema = z.object({
  title: z.string().min(4).max(48),
  userId: z.number()
});

export const UpdateWalletDtoSchema = z.object({
  title: z.string().min(4).max(48)
});

export const SumOfWalletTransactionsByTypeResponseSchema = z.object({
  name: z.string(),
  value: z.number()
});

export const TagInfoSchema = z.object({
  tag: z.string(),
  amount: z.number(),
  amountColor: z.string()
});
