import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';
import type {
  ChangeEmailDto,
  LoginDto,
  SignupDto,
  Token,
  UpdateUserDto,
  User
} from './session.types';

export const getCurrentUser = async () => {
  const response = await api.get<User>('/auth');

  return response.data;
};

export const verifyEmail = async ({ token }: { token: string }) => {
  const response = await api.get<SuccessMessage>(`/auth/change-email?token=${token}`);

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

export const updateUser = async (params: { userId: number; updateUserDto: UpdateUserDto }) => {
  const response = await api.patch<SuccessMessage>(`/users/${params.userId}`, params.updateUserDto);

  return response.data;
};

export const changeEmail = async (changeEmailDto: ChangeEmailDto) => {
  const response = await api.post<SuccessMessage>('/auth/change-email', changeEmailDto);

  return response.data;
};

export const verifyChangeEmail = async (token: Token) => {
  const response = await api.get<SuccessMessage>(`/auth/change-email?token=${token.token}`);

  return response.data;
};
