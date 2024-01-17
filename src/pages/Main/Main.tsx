import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import { useDispatch, useSelector } from 'services/hooks';
import Login from 'pages/Login/Login';
import Tasks from '../Tasks/Tasks';
import Lead from './Lead';
import User from './User';
import styles from './Main.module.scss';

const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.system);
  const isLead = false;
  return (
    <main className={styles.main}>
      {/*       <h1>Страница лида</h1>
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
      </div> */}
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User />}
      {isLoggedIn && isLead && <Lead />}
    </main>
  );
};

export default Main;
