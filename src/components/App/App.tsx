import { Main, Login } from 'pages';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};
export default App;
