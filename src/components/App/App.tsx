import { Main, Login, Error } from 'pages';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute path="/" />}>
          <Route element={<Main />} path="/main" />
        </Route>
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
};
export default App;
