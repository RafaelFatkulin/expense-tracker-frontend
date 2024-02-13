import { z } from 'zod';
import { TransactionSchema } from '~entities/transaction';

export const WalletSchema = z.object({
  id: z.number(),
  title: z.string(),
  balance: z.number().nullish(),
  userId: z.number()
});

export const WalletWithTransactionsSchema = z.object({
  id: z.number(),
  title: z.string(),
  balance: z.number().nullish(),
  userId: z.number(),
  incomes: z.array(TransactionSchema),
  expenses: z.array(TransactionSchema)
});

export const CreateWalletDtoSchema = z.object({
  title: z.string().min(4).max(48),
  userId: z.number()
});

export const UpdateWalletDtoSchema = z.object({
  title: z.string().min(4).max(48)
});
