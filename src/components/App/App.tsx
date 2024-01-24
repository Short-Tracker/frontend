import { Main, Login, Error } from 'pages';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import { useDispatch } from 'services/hooks';
import { useEffect } from 'react';
import refreshTokenThunk from 'thunks/refresh-token-thunk';
import { Toaster } from 'react-hot-toast';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, [dispatch]);
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute path="/" />}>
          <Route element={<Main />} path="/main" />
        </Route>
        <Route path="/error" element={<Error />} />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
