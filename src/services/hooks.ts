import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api';
import { AxiosError } from 'axios';
import { Tasks, Users } from './types';
import { getTaskById, getTaskByUserId } from '@/utils/tools';
import { useTaskContext } from '@/context/TaskContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
  const { setCount } = useTaskContext();

  return useQuery({
    queryKey: ['tasks'] as const,
    queryFn: async () => {
      const { data } = await api.get<Tasks[]>('/tasks');
      const taskByUserId = getTaskByUserId(data, idUser) ?? [];
      setCount(taskByUserId.length);
      return taskByUserId;
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};

export const useGetTaskDetail = (id: string) => {
  return useQuery({
    queryKey: ['tasks/detail', id] as const,
    queryFn: async () => {
      const { data } = await api.get<Tasks[]>('/tasks');
      return getTaskById(data, id) ?? {};
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};

export const useAddTask = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: object) => {
      const { data } = await api.post<Tasks[]>('/tasks', payload);
      return data ?? {};
    },
    onSuccess: () => {
      onSuccess();
      toast.success('Sucessfully add new task');
      queryClient.invalidateQueries(['tasks']); // Refetch taks list if needed
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};

export const useEditTask = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Tasks) => {
      const { data } = await api.put(`/tasks/${payload.id}`, payload);
      return data ?? {};
    },
    onSuccess: (data) => {
      onSuccess();
      toast.success('Sucessfully edit task');
      queryClient.invalidateQueries(['tasks/detail', data.id]); // Refetch taks list if needed
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};

export const useDeleteTask = (onSuccess: () => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/tasks/${id}`);
      return data ?? {};
    },
    onSuccess: () => {
      onSuccess();
      toast.success('Sucessfully remove task');
      navigate('/');
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });
};
