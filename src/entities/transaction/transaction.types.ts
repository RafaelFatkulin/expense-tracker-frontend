import type { z } from 'zod';
import type { TransactionSchema } from '~entities/transaction/transaction.contracts';

export type Transaction = z.infer<typeof TransactionSchema>;
