import Main from 'pages';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};
export default App;
