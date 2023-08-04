import { APP_ENTRYPOINT } from '@/config/config';

import { authenticatedRequest } from '../request';
import { EditUserParams, InviteUserParams } from '../types/users';

export const getUsers = async (status: string | null) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/user?status=${status ?? ''}`
  );
  return response;
};

export const inviteUsers = async (body: InviteUserParams) => {
  const response = await authenticatedRequest.post(
    `${APP_ENTRYPOINT}/user`,
    body
  );
  return response;
};

export const editUsers = async (body: EditUserParams) => {
  const response = await authenticatedRequest.patch(
    `${APP_ENTRYPOINT}/user`,
    body
  );
  return response;
};
