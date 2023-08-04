export type CreateRole = {
  name: string;
  permissions?: Permission[];
};

export type UpdateRole = {
  role_uuid: string;
  permissions?: Permission[];
};

export type Permission = {
  permission_id: number;
  accessTypes?: number[];
};

export type Permissions = {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  user_permissions_accessType?: AccessType[];
};

export type AccessType = {
  accessType: Permissions;
};

export type PermissionGet = {
  id: number;
  name: string;
  access: PermissionGet[];
};
