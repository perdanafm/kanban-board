import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { AxiosError } from 'axios';
import { Tasks, Users } from './types';
import { getTaskById, getTaskByUserId } from '@/utils/tools';

export const useGetUsers = () => {
  const defaultData = [
    {
      email: '',
      password: '',
      id: '',
      createdAt: '',
    },
  ];
  return useQuery({
    queryKey: ['users'] as const,
    queryFn: async () => {
      const { data } = await api.get<Users[]>('/login');
      return data ?? defaultData;
    },
    enabled: false,
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};

export const useGetTasks = (idUser: string) => {
  return useQuery({
    queryKey: ['tasks'] as const,
    queryFn: async () => {
      const { data } = await api.get<Tasks[]>('/tasks');
      return getTaskByUserId(data, idUser) ?? [];
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};

export const useGetTaskDetail = (id: string) => {
  return useQuery({
    queryKey: ['tasks/detail'] as const,
    queryFn: async () => {
      const { data } = await api.get<Tasks[]>('/tasks');
      return getTaskById(data, id) ?? {};
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};
