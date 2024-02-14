import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '~shared/lib/react-query';
import { useToast } from '~shared/ui/use-toast';
import { createWallet, deleteWallet, getWallet, getWallets, updateWallet } from './wallet.api';

const keys = {
  root: ['wallet'],
  all: () => [...keys.root, 'all'],
  getOne: (id: number) => [...keys.root, 'get', id],
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

export const useCreateWalletMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.create(),
    mutationFn: createWallet,
    onSuccess: async ({ message }) => {
      await queryClient.refetchQueries({ queryKey: keys.all() });
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
      await queryClient.refetchQueries({ queryKey: keys.all() });
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
      await queryClient.refetchQueries({ queryKey: keys.all() });
      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};
