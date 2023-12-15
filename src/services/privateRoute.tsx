import React from 'react';
import { Navigate } from 'react-router-dom';

const privateRoute = ({ path = '/' }) => {
  return <Navigate to={path} />;
};
export default privateRoute;
