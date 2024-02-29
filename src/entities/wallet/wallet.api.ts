import type { Transaction } from '~entities/transaction';
import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';
import type {
  CalendarData,
  CreateWalletDto,
  SumOfWalletTransactionsByTypeResponse,
  TagInfo,
  UpdateWalletDto,
  Wallet
} from './wallet.types';

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

export const getWalletTransactionSum = async (id: number) => {
  const response = await api.get<SumOfWalletTransactionsByTypeResponse[]>(
    `/wallets/${id}/transactions-sum`
  );
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

export const getWalletCalendarData = async (id: number, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();

  if (startDate !== undefined) {
    params.append('startDate', startDate.toString());
  }

  if (endDate !== undefined) {
    params.append('endDate', endDate.toString());
  }

  const url = `/wallets/${id}/calendar?${params.toString()}`;

  const response = await api.get<CalendarData[]>(url);

  return response.data;
};

export const getTagsData = async (id: number) => {
  const response = await api.get<TagInfo[]>(`/wallets/${id}/tags`);

  return response.data;
};
