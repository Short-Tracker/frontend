import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import Login from 'pages/Login/Login';
import getTaskThunk from 'thunks/get-task-thunks';
import { TTask } from 'types/types';
import getUsersThunk from 'thunks/get-users-thunks';
import Lead from './Lead/Lead';
import User from './User/User';
import styles from './Main.module.scss';

const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.system);
  const isLead = useSelector((state) => state.user);
  const tasks: TTask = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTaskThunk(isLoggedIn));
    dispatch(getUsersThunk(isLoggedIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <main className={styles.main}>
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User />}
      {isLoggedIn && isLead && <Lead allTasks={tasks} />}
    </main>
  );
};
export default Main;
