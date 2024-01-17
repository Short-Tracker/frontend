import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from './hooks';

interface IPrivateRoute {
  path: string;
  children: ReactNode;
}
// path - это путь куда юзер отправляется если он неавторизован
const PrivateRoute: FC<IPrivateRoute> = ({ path, children }) => {
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
