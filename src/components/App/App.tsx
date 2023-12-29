import Main from 'pages';
import React from 'react';
import Status from 'components/Status/Status';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Status />} />
      </Routes>
    </div>
  );
};
export default App;
