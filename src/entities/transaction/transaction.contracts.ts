import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.number(),
  type: z.string(),
  title: z.string(),
  amount: z.number(),
  createdAt: z.date(),
  walletId: z.number()
});
