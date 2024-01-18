import { Main, Login, Error } from 'pages';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
};
export default App;
