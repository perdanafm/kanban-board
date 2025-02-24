import { CategoryType, StatusType } from '@/constants/types';

export type Users = {
  createdAt: string;
  name: string;
  email: string;
  password: string;
  id: number;
};

export interface Tasks {
  createdAt: string;
  updatedAt: string;
  title: string;
  status: StatusType;
  description: string;
  type: CategoryType[];
  userId: number;
  id: string;
}
