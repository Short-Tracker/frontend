import { baseUrl as api } from 'constants/baseUrl';

const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error('Ошибка');
  }
  res.json();
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
