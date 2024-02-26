import type { z } from 'zod';
import type {
  CreateTransactionDtoSchema,
  TransactionSchema,
  UpdateTransactionDtoSchema
} from './transaction.contracts';

export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransactionDto = z.infer<typeof CreateTransactionDtoSchema>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionDtoSchema>;
export type TransactionType = 'INCOME' | 'EXPENSE';
export const transactionTypes = [
  { label: 'Доход', value: 'INCOME' },
  { label: 'Расход', value: 'EXPENSE' }
] as const;
