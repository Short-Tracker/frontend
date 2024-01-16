import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import { useSelector } from 'services/hooks';
import Tasks from '../Tasks/Tasks';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles.main}>
      <h1>Страница лида</h1>
      <h2>Всё равно всё будет перерисовываться</h2>
      <div className={styles.main__container}>
        <SideBar />
        <div className={styles.main__tasks}>
          <div className={styles.main__serchContainer}>
            <Search />
            <UniversalButton>Кнопка</UniversalButton>
          </div>
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
        </div>
      </div>
    </main>
  );
};

export default Main;
