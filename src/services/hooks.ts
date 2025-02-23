import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { AxiosError } from 'axios';
import { Users } from './types';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'] as const,
    queryFn: async () => {
      const { data } = await api.get<Users>('/login');
      return data;
    },
    enabled: false,
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};
