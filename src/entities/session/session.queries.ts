import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { ErrorMessage } from '~shared/api';
import { queryClient } from '~shared/lib/react-query';
import { pathKeys } from '~shared/lib/react-router';
import { useToast } from '~shared/ui/use-toast';
import { changeEmail, getCurrentUser, login, signup, updateUser, verifyEmail } from './session.api';
import { sessionStore } from './session.model';

const keys = {
  root: ['session'],
  currentUser: () => [...keys.root, 'currentUser'] as const,
  login: () => [...keys.root, 'login'] as const,
  signup: () => [...keys.root, 'signup'] as const,
  updateUser: () => [...keys.root, 'updateUser'] as const,
  logout: () => [...keys.root, 'logout'] as const,
  verify: () => [...keys.root, 'verify'] as const,
  changeEmail: () => [...keys.root, 'changeEmail'] as const,
  verifyChangeEmail: () => [...keys.root, 'verifyChangeEmail'] as const
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: keys.currentUser(),
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem('token')
  });
};

export const useVerifyEmailQuery = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')!;

  return useQuery({
    queryKey: keys.verify(),
    queryFn: () => verifyEmail({ token })
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
        description: error.response.data?.message,
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
        description: error?.response?.data?.message,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateUserMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.updateUser(),
    mutationFn: updateUser,
    onSuccess: async ({ message }) => {
      toast({
        title: 'Успешно',
        description: message
      });
      await queryClient.invalidateQueries({ queryKey: keys.currentUser() });
    },
    onError: (error: ErrorMessage) => {
      toast({
        title: 'Ошибка',
        description: error?.response?.data?.message,
        variant: 'destructive'
      });
    }
  });
};

export const useChangeEmailMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: keys.changeEmail(),
    mutationFn: changeEmail,
    onSuccess: ({ message }) => {
      toast({
        title: 'Успешно',
        description: message
      });
    },
    onError: (error: ErrorMessage) => {
      toast({
        title: 'Ошибка',
        description: error?.response?.data?.message,
        variant: 'destructive'
      });
    }
  });
};

export const useChangeEmailQuery = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')!;

  return useQuery({
    queryKey: keys.verifyChangeEmail(),
    queryFn: () => verifyEmail({ token })
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
