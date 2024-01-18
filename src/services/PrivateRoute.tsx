import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from './hooks';

interface IPrivateRoute {
  path: string;
}
// path - это путь куда юзер отправляется если он неавторизован
const PrivateRoute: FC<IPrivateRoute> = ({ path }) => {
  const { isLoggedIn } = useSelector((state) => state.system);
  return isLoggedIn ? <Outlet /> : <Navigate to={path} />;
};
export default PrivateRoute;
