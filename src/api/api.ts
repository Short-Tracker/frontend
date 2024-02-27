import { baseUrl as api } from 'constants/baseUrl';
import { TResults, TUpdateTaskStatusApi } from 'types/types';

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

export const getTask = (p: string) => request(`tasks/?status=${p}`, { method: 'GET' });

export const getTodoTask = () => getTask('to do');
export const getInProgressTask = () => getTask('in progress');
export const getDoneTask = () => getTask('done');
export const getHoldTask = () => getTask('hold');

export const createNewUserApi = (userData: any) =>
  request('users/', {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify(userData),
  });
export const getAllTasks = () => request('tasks/?limit=99&offset=0', { method: 'GET' });
export const getUsers = () => request('users/', { method: 'GET' });
export const getAnalitics = (data: any) =>
  request(
    `task-analytics/?start_date=${data.start_date}&end_date=${data.end_date}&sort_by=${data.sort_by}`,
    {
      method: 'GET',
    }
  );
