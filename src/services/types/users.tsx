export type InviteUserParams = {
  name: string;
  email: string;
  roleUuId: string;
};

export type EditUserParams = {
  isActive: boolean;
  userUuId: string;
  roleUuId: string;
};
