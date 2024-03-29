import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '~shared/lib/react-query';
import { useToast } from '~shared/ui/use-toast';
import {
  createWallet,
  deleteWallet,
  getLastDayTransactionsOfWallet,
  getTagsData,
  getWallet,
  getWalletCalendarData,
  getWallets,
  getWalletTransactionSum,
  updateWallet
} from './wallet.api';

const keys = {
  root: ['wallet'],
  all: () => [...keys.root, 'all'],
  getOne: (id: number) => [...keys.root, 'get', id],
  getLastDay: (id: number) => [...keys.root, 'get-last-day', id],
  getWalletTransactionSum: (id: number) => [...keys.root, 'get-transactions-sum', id],
  getCalendar: (id: number) => [...keys.root, 'calendar', id],
  getTags: (id: number) => [...keys.root, 'tags', id],
  create: () => [...keys.root, 'create'],
  update: (id: number) => [...keys.root, 'update', id],
  delete: (id: number) => [...keys.root, 'delete', id]
};

export const useGetAllWalletsQuery = () => {
  return useQuery({
    queryKey: keys.all(),
    queryFn: getWallets
  });
};

export const useGetOneWalletQuery = (id: number) => {
  return useQuery({
    queryKey: keys.getOne(id),
    queryFn: () => getWallet(id)
  });
};

export const useGetLastDayTransactionsOfWallet = (id: number) => {
  return useQuery({
    queryKey: keys.getLastDay(id),
    queryFn: () => getLastDayTransactionsOfWallet(id)
  });
};

export const useGetWalletTransactionSumQuery = (id: number) => {
  return useQuery({
    queryKey: keys.getWalletTransactionSum(id),
    queryFn: () => getWalletTransactionSum(id)
  });
};

export const useGetCalendarQuery = (id: number, startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: keys.getCalendar(id),
    queryFn: () => getWalletCalendarData(id, startDate, endDate)
  });
};

export const useGetTagsDataQuery = (id: number) => {
  return useQuery({
    queryKey: keys.getTags(id),
    queryFn: () => getTagsData(id)
  });
};

export const useCreateWalletMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.create(),
    mutationFn: createWallet,
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all() });
      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};

export const useUpdateWalletMutation = (id: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.update(id),
    mutationFn: updateWallet,
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all() });
      await queryClient.invalidateQueries({ queryKey: keys.getWalletTransactionSum(id) });
      await queryClient.invalidateQueries({ queryKey: keys.getLastDay(id) });

      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};

export const useDeleteWalletMutation = (id: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.delete(id),
    mutationFn: () => deleteWallet(id),
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all() });
      await queryClient.invalidateQueries({ queryKey: keys.getWalletTransactionSum(id) });
      await queryClient.invalidateQueries({ queryKey: keys.getLastDay(id) });

      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};
