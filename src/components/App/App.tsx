import { Main, Login } from 'pages';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <PrivateRoute path="/">
              <Main />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
