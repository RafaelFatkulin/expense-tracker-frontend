import type { Transaction } from '~entities/transaction';
import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';
import type { CreateWalletDto, UpdateWalletDto, Wallet } from './wallet.types';

export const getWallets = async () => {
  const response = await api.get<Wallet[]>('/wallets');
  return response.data;
};

export const getWallet = async (id: number) => {
  const response = await api.get<Wallet>(`/wallets/${id}`);
  return response.data;
};

export const getLastDayTransactionsOfWallet = async (id: number) => {
  const response = await api.get<Transaction[]>(`/wallets/${id}/last-transactions`);
  return response.data;
};

export const createWallet = async (createWalletDto: CreateWalletDto) => {
  const response = await api.post<SuccessMessage>('/wallets', createWalletDto);
  return response.data;
};

export const updateWallet = async (params: { id: number; updateWalletDto: UpdateWalletDto }) => {
  const response = await api.patch<SuccessMessage>(`/wallets/${params.id}`, params.updateWalletDto);
  return response.data;
};

export const deleteWallet = async (id: number) => {
  const response = await api.delete<SuccessMessage>(`/wallets/${id}`);
  return response.data;
};
