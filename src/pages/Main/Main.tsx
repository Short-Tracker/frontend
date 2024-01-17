import React from 'react';
import { useSelector } from 'services/hooks';
import Login from 'pages/Login/Login';
import Lead from './Lead/Lead';
import User from './User/User';
import styles from './Main.module.scss';
import GroupTasks from '../GroupTasks/GroupTasks';

const Main = () => {
  const { isLoggedIn } = useSelector((state) => state.system);
  const isLead = true;
  return (
    <main className={styles.main}>
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User />}
      {isLoggedIn && isLead && <Lead />}
    </main>
  );
};
export default Main;
