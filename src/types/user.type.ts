import { ROLES } from '../constants/global';

export type TUserRole = (typeof ROLES)[keyof typeof ROLES];

export type TUser = {
  userId: string;
  email: string;
  role: TUserRole;
  iat: number;
  exp: number;
};

export type TProfile = {
  name: TName;
  image?: string;
  fullName: string;
};

export interface TUserData {
  name: TName;
  _id: string;
  email: string;
  image?: string;
  role: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  id: string;
}

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
