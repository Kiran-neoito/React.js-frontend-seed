import { APP_ENTRYPOINT } from '@/config/config';
import { authenticatedRequest, request } from '../request';
import { LoginParams, ResetPasswordParams } from '../types/auth';

export const login = async (values: LoginParams) => {
  const response = await request.post(`${APP_ENTRYPOINT}/auth/login`, values);
  return response;
};

export const sendResetLink = async (email: string) => {
  const response = await request.post(`${APP_ENTRYPOINT}/auth/reset-link`, {
    email,
  });
  return response;
};

export const verifyResetToken = async (params: { id: string }) => {
  const response = await request.get(`${APP_ENTRYPOINT}/auth/verify-reset`, {
    params,
  });
  return response;
};

export const resetPassword = async (args: ResetPasswordParams) => {
  const response = await request.post(`${APP_ENTRYPOINT}/auth/reset`, args);
  return response;
};

export const logout = async () => {
  const response = await authenticatedRequest.post(
    `${APP_ENTRYPOINT}/auth/logout`
  );
  return response;
};
