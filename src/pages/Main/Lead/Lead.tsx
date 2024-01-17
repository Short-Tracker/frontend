import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import Tasks from 'pages/Tasks/Tasks';
import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import styles from './Lead.module.scss';

const Lead = () => {
  return (
    <div className={styles.Lead__container}>
      <SideBar />
      <div className={styles.Lead__tasks}>
        <div className={styles.Lead__serchContainer}>
          <Search />
          <UniversalButton>Кнопка</UniversalButton>
        </div>
        <Tasks />
        <Tasks />
        <Tasks />
        <Tasks />
      </div>
    </div>
  );
};
export default Lead;
