import { CategoryType } from '@/constants/types';
import { Tasks, Users } from '@/services/types';

export function checkLogin(email: string, password: string, users: Users[]) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user
    ? { success: true, user }
    : { success: false, message: 'Invalid email or password' };
}

export function getTaskByUserId(tasks: Tasks[], idUser: string) {
  return tasks.filter((value) => Number(value.userId) === Number(idUser));
}

export function getTaskById(tasks: Tasks[], id: string) {
  return tasks.filter((value) => Number(value.id) === Number(id))[0];
}

export const capitalize = (str: CategoryType) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatISODate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
