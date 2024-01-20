import React from 'react';
import Tasks from 'pages/Tasks/Tasks';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles.main}>
      <Tasks />
    </main>
  );
};

export default Main;
