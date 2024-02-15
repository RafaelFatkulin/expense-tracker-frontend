import {
  useMutation,
  useQuery
  // useQueryClient
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { ErrorMessage } from '~shared/api';
import { queryClient } from '~shared/lib/react-query';
import { pathKeys } from '~shared/lib/react-router';
import { useToast } from '~shared/ui/use-toast';
import { getCurrentUser, login, signup, updateUser } from './session.api';
import { sessionStore } from './session.model';
import type { UpdateUserDto } from './session.types';

const keys = {
  root: ['session'],
  currentUser: () => [...keys.root, 'currentUser'] as const,
  login: () => [...keys.root, 'login'] as const,
  signup: () => [...keys.root, 'signup'] as const,
  updateUser: () => [...keys.root, 'updateUser'] as const,
  logout: () => [...keys.root, 'logout'] as const
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: keys.currentUser(),
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem('token')
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.login(),
    mutationFn: login,
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);
      navigate(pathKeys.wallet.root());
    },
    onError: (error: ErrorMessage) => {
      toast({
        title: 'Ошибка',
        description: error.response.data.message as string,
        variant: 'destructive'
      });
    }
  });
};

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.signup(),
    mutationFn: signup,
    onSuccess: ({ message }) => {
      toast({
        title: 'Успешно',
        description: message
      });
      navigate(pathKeys.login());
    },
    onError: (error: ErrorMessage) => {
      toast({
        title: 'Ошибка',
        description: error?.response?.data?.message as string,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateUserMutation = ({ userId, username }: UpdateUserDto) => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.updateUser(),
    mutationFn: () => updateUser({ userId, username }),
    onSuccess: ({ message }) => {
      toast({
        title: 'Успешно',
        description: message
      });
    }
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: keys.logout(),
    onSettled: async () => {
      sessionStore.getState().updateToken(null);
      await queryClient.invalidateQueries({
        refetchType: 'none'
      });
      queryClient.clear();
      localStorage.clear();
      navigate(pathKeys.home(), { replace: true });
    }
  });
};
