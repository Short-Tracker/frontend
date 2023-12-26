import React from 'react';
import { Navigate } from 'react-router-dom';

/* eslint-disable */
//Через props patch отправляется маршрут куда переходить при отклонении
const PrivateRoute = ({ path = '/' }) => {
  return <Navigate to={path} />;
};
export default PrivateRoute;
