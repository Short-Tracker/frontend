import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from './hooks';

// Здесь нужно написать нормальный интерфейс вместо any
const PrivateRoute = ({ path, children }: any) => {
  const { isLoggedIn } = useSelector((state) => state.system);
  console.log(children);
  if (!isLoggedIn) {
    return <Navigate to={path} />;
  }
  return <> {children} </>;
};
export default PrivateRoute;
