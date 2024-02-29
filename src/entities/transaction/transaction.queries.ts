import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '~shared/lib/react-query';
import { useToast } from '~shared/ui/use-toast';
import {
  createTransaction,
  deleteTransaction,
  getOneTransaction,
  getWalletTransactions,
  updateTransaction
} from './transaction.api';
import type { TransactionType } from './transaction.types';

const keys = {
  root: ['transaction'],
  all: () => [...keys.root, 'all'],
  getOne: (id: number) => [...keys.root, 'get', id],
  create: () => [...keys.root, 'create'],
  update: (id: number) => [...keys.root, 'update', id],
  delete: (id: number) => [...keys.root, 'delete', id]
};

export const useGetWalletTransactionsQuery = (id: number, type?: TransactionType, tag?: number) => {
  return useQuery({
    queryKey: keys.all(),
    queryFn: () => getWalletTransactions(id, type, tag)
  });
};

export const useGetOneTransactionQuery = (id: number) => {
  return useQuery({
    queryKey: keys.getOne(id),
    queryFn: () => getOneTransaction(id)
  });
};

export const useCreateTransactionMutation = (walletId: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.create(),
    mutationFn: createTransaction,
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all() });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'get', walletId] });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'get-last-day', walletId] });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'get-transactions-sum', walletId]
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'calendar', walletId]
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'tags', walletId]
      });

      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};

export const useUpdateTransactionMutation = (id: number, walletId: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.update(id),
    mutationFn: updateTransaction,
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all() });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'all'] });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'get', walletId] });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'get-last-day', walletId] });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'get-transactions-sum', walletId]
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'calendar', walletId]
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'tags', walletId]
      });

      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};

export const useDeleteTransactionMutation = (id: number, walletId: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.delete(id),
    mutationFn: deleteTransaction,
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all() });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'all'] });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'get', walletId] });
      await queryClient.invalidateQueries({ queryKey: ['wallet', 'get-last-day', walletId] });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'get-transactions-sum', walletId]
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'calendar', walletId]
      });
      await queryClient.invalidateQueries({
        queryKey: ['wallet', 'tags', walletId]
      });

      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};
