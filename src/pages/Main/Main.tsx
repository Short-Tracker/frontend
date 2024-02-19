import Preloader from 'components/Preloader/Preloader';
import Login from 'pages/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import getTasksThunk from 'thunks/get-tasks-thunks';
import getUsersThunk from 'thunks/get-users-thunks';
import Lead from './Lead/Lead';
import styles from './Main.module.scss';
import User from './User/User';

const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.system);
  const isLead = useSelector((state) => state.user).is_team_lead;
  const tasks = useSelector((state) => state.tasks);

  // const isLead = true;
  useEffect(() => {
    dispatch(getTasksThunk(isLoggedIn));
    dispatch(getUsersThunk(isLoggedIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, tasks.count]);

  return (
    <main className={styles.main}>
      {isLoading && <Preloader />}
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User allTasks={tasks} />}
      {isLoggedIn && isLead && <Lead allTasks={tasks} />}
    </main>
  );
};
export default Main;
