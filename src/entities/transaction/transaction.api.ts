import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';
import type {
  CreateTransactionDto,
  Transaction,
  TransactionType,
  UpdateTransactionDto
} from './transaction.types';

export const getWalletTransactions = async (
  walletId: number,
  transactionType?: TransactionType,
  transactionTagId?: number
) => {
  const params = new URLSearchParams({ wallet: walletId.toString() });

  // Add transactionType to the parameters if provided
  if (transactionType !== undefined) {
    params.append('type', transactionType.toString());
  }

  // Add transactionTagId to the parameters if provided
  if (transactionTagId !== undefined) {
    params.append('tag', transactionTagId.toString());
  }

  const url = `/transactions?${params.toString()}`;
  const response = await api.get<Transaction[]>(url);
  return response.data;
};

export const getOneTransaction = async (id: number) => {
  const response = await api.get<Transaction>(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (createTransactionDto: CreateTransactionDto) => {
  const response = await api.post<SuccessMessage>('/transactions', createTransactionDto);
  return response.data;
};

export const updateTransaction = async (params: {
  id: number;
  updateTransactionDto: UpdateTransactionDto;
}) => {
  const response = await api.patch<SuccessMessage>(
    `/transactions/${params.id}`,
    params.updateTransactionDto
  );
  return response.data;
};

export const deleteTransaction = async (params: { id: number }) => {
  const response = await api.delete<SuccessMessage>(`/transactions/${params.id}`);
  return response.data;
};
