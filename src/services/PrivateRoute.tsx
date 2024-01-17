import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from './hooks';

// Здесь нужно написать нормальный интерфейс вместо any
const PrivateRoute = ({ path, children }: any) => {
  const { isLoggedIn } = useSelector((state) => state.system);

  useEffect(() => {
    if (!isLoggedIn) {
      <Navigate to={path} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <> {children} </>;
};
export default PrivateRoute;
