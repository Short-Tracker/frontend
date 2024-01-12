import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import Tasks from '../Tasks/Tasks';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles.main}>
      <h1>главная страница</h1>
      <UniversalButton>Кнопка</UniversalButton>
      <Tasks />
      <Search />
    </main>
  );
};

export default Main;
