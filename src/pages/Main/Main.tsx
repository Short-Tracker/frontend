import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles.main}>
      <h1>главная страница</h1>
      <UniversalButton>Кнопка</UniversalButton>
    </main>
  );
};

export default Main;
