import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import Login from 'pages/Login/Login';
import getTaskThunk from 'thunks/get-task-thunks';
import { TTask, TUser } from 'types/types';
import getUsersThunk from 'thunks/get-users-thunks';
import getUserMeThunk from 'thunks/get-user-me-thunk';
import Lead from './Lead/Lead';
import User from './User/User';
import styles from './Main.module.scss';
import store from '../../store/store';

const Main = () => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.system);
  const isLead = useSelector((state) => state.user);
  const tasks: TTask = useSelector((state) => state.task);
  const currentUser: TUser = useSelector((state) => state.user);
  //
  useEffect(() => {
    dispatch(getUserMeThunk());
    dispatch(getTaskThunk(isLoggedIn));
    dispatch(getUsersThunk(isLoggedIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, tasks.results.length]);

  return (
    <main className={styles.main}>
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User />}
      {isLoggedIn && isLead && <Lead allTasks={tasks} currentUser={currentUser} />}
    </main>
  );
};
export default Main;
