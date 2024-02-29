import type { z } from 'zod';
import type {
  CalendarDataSchema,
  CreateWalletDtoSchema,
  SumOfWalletTransactionsByTypeResponseSchema,
  TagInfoSchema,
  UpdateWalletDtoSchema,
  WalletSchema
} from './wallet.contracts';

export type Wallet = z.infer<typeof WalletSchema>;
export type CreateWalletDto = z.infer<typeof CreateWalletDtoSchema>;
export type UpdateWalletDto = z.infer<typeof UpdateWalletDtoSchema>;
export type SumOfWalletTransactionsByTypeResponse = z.infer<
  typeof SumOfWalletTransactionsByTypeResponseSchema
>;
export type CalendarData = z.infer<typeof CalendarDataSchema>;
export type TagInfo = z.infer<typeof TagInfoSchema>;
