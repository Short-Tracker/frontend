import Main from 'pages';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};
export default App;
