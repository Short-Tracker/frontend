import React from 'react';
import styles from './main.module.scss';

import Tasks from '../tasks/tasks';
import ModalWindow from '../modalWindow/modalWindow';

const Main = () => {
  return (
    <main className={styles.main}>
      <h1>главная страница</h1>
      <Tasks />
      <ModalWindow />
    </main>
  );
};

export default Main;
