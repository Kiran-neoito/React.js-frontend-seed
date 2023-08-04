import { APP_ENTRYPOINT } from '@/config/config';

import { authenticatedRequest } from '../request';
import { CreateRole, UpdateRole } from '../types/rbac';

export const CreateRoleApi = async (createRoleData: CreateRole) => {
  const response = await authenticatedRequest.post(
    `${APP_ENTRYPOINT}/role`,
    createRoleData
  );
  return response;
};

export const UpdateRoleApi = async (createRoleData: UpdateRole) => {
  const response = await authenticatedRequest.patch(
    `${APP_ENTRYPOINT}/role`,
    createRoleData
  );
  return response;
};

export const getPermissions = async () => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/role/permissions`
  );
  return response;
};

export const getRoles = async () => {
  const response = await authenticatedRequest.get(`${APP_ENTRYPOINT}/role`);
  return response;
};

export const getRole = async (roleId: string) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/role/${roleId}`
  );
  return response;
};

export const deleteRole = async (roleId: string) => {
  const response = await authenticatedRequest.delete(
    `${APP_ENTRYPOINT}/role/${roleId}`
  );
  return response;
};

export const getRoleUsers = async (roleId: string) => {
  const response = await authenticatedRequest.get(
    `${APP_ENTRYPOINT}/role/${roleId}/users`
  );
  return response;
};
