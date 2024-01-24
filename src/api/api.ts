import { baseUrl as api } from 'constants/baseUrl';

const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error('Ошибка');
  }
  return res.json();
};

export const request = (url: string, config?: RequestInit): Promise<any> =>
  fetch(`${process.env.API || api}${url}`, { ...config, credentials: 'include' }).then(
    checkResponse
  );

export const authUser = (userData: any) =>
  request('auth/login/', {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(userData),
  });

export const logoutUser = () =>
  request('auth/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

export const refreshAuthToken = (userData: { email: string; password: string }) =>
  request('auth/refresh/', {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(userData),
  });
export const createTask = (taskData: any) =>
  request('tasks/', {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(taskData),
  });
export const getAllTasks = () => request('tasks/', { method: 'GET' });
export const getUsers = () => request('users/', { method: 'GET' });
