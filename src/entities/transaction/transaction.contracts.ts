import { z } from 'zod';
import { TagSchema } from '~entities/tag';

export const TransactionSchema = z.object({
  id: z.number(),
  type: z.string(),
  title: z.string(),
  amount: z.number(),
  createdAt: z.date(),
  walletId: z.number(),
  transactionTag: TagSchema
});

export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE']);

export const CreateTransactionDtoSchema = z.object({
  title: z.string().min(4).max(255),
  type: TransactionTypeSchema,
  amount: z.string(),
  walletId: z.number(),
  transactionTagId: z.number()
});

export const UpdateTransactionDtoSchema = z.object({
  title: z.string().min(4).max(255),
  type: TransactionSchema,
  amount: z.number(),
  transactionTagId: z.number()
});
