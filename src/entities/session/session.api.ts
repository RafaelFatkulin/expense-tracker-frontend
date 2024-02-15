import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';
import type { LoginDto, SignupDto, Token, UpdateUserDto, User } from './session.types';

export const getCurrentUser = async () => {
  const response = await api.get<User>('/auth');
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

export const verifyEmail = async ({ token }: { token: string }) => {
  const response = await api.get<SuccessMessage>(`/auth/verify?token=${token}`);

  return response.data;
};

export const login = async ({ email, password, remember }: LoginDto) => {
  const response = await api.post<Token>('/auth/login', {
    email,
    password,
    remember
  });

  return response.data;
};

export const signup = async ({ username, email, password }: SignupDto) => {
  const response = await api.post<SuccessMessage>('/auth/signup', {
    username,
    email,
    password
  });

  return response.data;
};

export const updateUser = async ({ userId, username }: UpdateUserDto) => {
  const response = await api.patch<SuccessMessage>(`/users/${userId}`, {
    username
  });

  return response.data;
};
