import type { CreateWalletDto, UpdateWalletDto, Wallet } from '~entities/wallet/wallet.types';
import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';

export const getWallets = async () => {
  const response = await api.get<Wallet[]>('/wallets');
  return response.data;
};

export const getWallet = async (id: number) => {
  const response = await api.get<Wallet>(`/wallets/${id}`);
  return response.data;
};

export const createWallet = async (createWalletDto: CreateWalletDto) => {
  const response = await api.post<SuccessMessage>('/wallets', createWalletDto);
  return response.data;
};

export const updateWallet = async (id: number, updateWalletDto: UpdateWalletDto) => {
  const response = await api.patch<SuccessMessage>(`/wallets/${id}`, updateWalletDto);
  return response.data;
};

export const deleteWallet = async (id: number) => {
  const response = await api.delete<SuccessMessage>(`/wallets/${id}`);
  return response.data;
};
