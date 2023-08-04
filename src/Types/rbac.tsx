import { CommonResponse } from './common';

export type RolesData = {
  totalCount: number;
  data: Role[];
};

export interface RolesResponse {
  data: CommonResponse<RolesData>;
}

export interface Role {
  id: number;
  role_name: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  role_uuid: string;
  permissions?: Permissions[];
  totalUsers: number;
  totalCount: number;
}
export interface Permissions {
  id: number;
  name: string;
  access?: Access[];
}
export interface Access {
  id: number;
  name: string;
}
