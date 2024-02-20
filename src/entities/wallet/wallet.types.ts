import type { z } from 'zod';
import type {
  CreateWalletDtoSchema,
  SumOfWalletTransactionsByTypeResponseSchema,
  UpdateWalletDtoSchema,
  WalletSchema
} from './wallet.contracts';

export type Wallet = z.infer<typeof WalletSchema>;
export type CreateWalletDto = z.infer<typeof CreateWalletDtoSchema>;
export type UpdateWalletDto = z.infer<typeof UpdateWalletDtoSchema>;
export type SumOfWalletTransactionsByTypeResponse = z.infer<
  typeof SumOfWalletTransactionsByTypeResponseSchema
>;
