import { ROLES } from '../constants/global';

export type TUserRole = (typeof ROLES)[keyof typeof ROLES];

export type TUser = {
  userId: string;
  email: string;
  role: TUserRole;
  iat: number;
  exp: number;
};
