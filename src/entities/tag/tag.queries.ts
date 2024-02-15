import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '~shared/lib/react-query';
import { useToast } from '~shared/ui/use-toast';
import { createTag, deleteTag, getAllTags, getOneTag, updateTag } from './tag.api';

const keys = {
  root: ['tag'],
  all: () => [...keys.root, 'all'],
  getOne: (id: number) => [...keys.root, 'get', id],
  create: () => [...keys.root, 'create'],
  update: (id: number) => [...keys.root, 'update', id],
  delete: (id: number) => [...keys.root, 'delete', id]
};

export const useGetAllTagsQuery = () => {
  return useQuery({
    queryKey: keys.all(),
    queryFn: getAllTags
  });
};

export const useGetOneTagQuery = (id: number) => {
  return useQuery({
    queryKey: keys.getOne(id),
    queryFn: () => getOneTag(id)
  });
};

export const useCreateTagMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.create(),
    mutationFn: createTag,
    onSuccess: async ({ message }) => {
      await queryClient.refetchQueries({ queryKey: keys.all() });
      toast({
        title: 'Успешно',
        description: message
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateTagMutation = (id: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.update(id),
    mutationFn: updateTag,
    onSuccess: async ({ message }) => {
      await queryClient.refetchQueries({ queryKey: keys.all() });
      toast({
        title: 'Успешно',
        description: message
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive'
      });
    }
  });
};
export const useDeleteTagMutation = (id: number) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.delete(id),
    mutationFn: () => deleteTag(id),
    onSuccess: async ({ message }) => {
      await queryClient.refetchQueries({ queryKey: keys.all() });
      toast({
        title: 'Успешно',
        description: message
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive'
      });
    }
  });
};
