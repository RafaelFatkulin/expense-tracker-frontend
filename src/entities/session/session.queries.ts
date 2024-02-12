import {
  useMutation,
  useQuery
  // useQueryClient
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '~shared/lib/react-query';
import { pathKeys } from '~shared/lib/react-router';
import { useToast } from '~shared/ui/use-toast';
import {
  checkEmail,
  checkUsername,
  getCurrentUser,
  login,
  signup,
  updateUser
} from './session.api';
import { sessionStore } from './session.model';
import type { UpdateUserDto } from './session.types';

const keys = {
  root: ['session'],
  currentUser: () => [...keys.root, 'currentUser'] as const,
  login: () => [...keys.root, 'login'] as const,
  signup: () => [...keys.root, 'signup'] as const,
  updateUser: () => [...keys.root, 'updateUser'] as const,
  checkUsername: () => [...keys.root, 'checkUsername'] as const,
  checkEmail: () => [...keys.root, 'checkEmail'] as const,
  logout: () => [...keys.root, 'logout'] as const
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: keys.currentUser(),
    queryFn: getCurrentUser
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: keys.login(),
    mutationFn: login,
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);
      navigate(pathKeys.wallet.root());
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
    }
  });
};

export const useCheckUsernameMutation = () => {
  return useMutation({
    mutationKey: keys.checkUsername(),
    mutationFn: checkUsername
  });
};

export const useCheckEmailMutation = () => {
  return useMutation({
    mutationKey: keys.checkEmail(),
    mutationFn: checkEmail
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
  // const queryClient = useQueryClient();
  console.log('mutate');

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
