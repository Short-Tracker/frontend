import { baseUrl as api } from 'constants/baseUrl';
import { TResults, TTask, TUpdateTaskStatusApi } from 'types/types';

const checkResponse = (res: Response) => {
  if (!res.ok) {
    return res.json().then((json) => {
      throw json;
    });
    // throw new Error('Ошибка');
  }
  return res.json();
};

export function request<T = any>(url: string, config?: RequestInit): Promise<T> {
  return fetch(`${process.env.API || api}${url}`, {
    ...config,
    credentials: 'include',
  }).then(checkResponse);
}

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
export const updateTaskApi = (taskData: any) =>
  request<{ tasks: TResults[] }>(`tasks/${taskData.id}`, {
    method: 'PATCH',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(taskData.data),
  });

export const updateTaskStatus = (taskData: TUpdateTaskStatusApi) =>
  request<TResults>(`tasks/${taskData.id}`, {
    method: 'PATCH',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify({ status: taskData.newStatus }),
  });

export const getTask = (p: string, s: string) =>
  request(`tasks/?status=${p}${s}`, { method: 'GET' });

interface ISearchString {
  (searchString?: string): any;
}
export const getTodoTask: ISearchString = (searchString = '') =>
  getTask('to do', searchString);
export const getInProgressTask: ISearchString = (searchString = '') =>
  getTask('in progress', searchString);
export const getDoneTask: ISearchString = (searchString = '') =>
  getTask('done', searchString);
export const getHoldTask: ISearchString = (searchString = '') =>
  getTask('hold', searchString);

export const createNewUserApi = (userData: any) =>
  request('users/', {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(userData),
  });
export const getAllTasks = () => request('tasks/?limit=99&offset=0', { method: 'GET' });
export const getUsers = () => request('users/', { method: 'GET' });
