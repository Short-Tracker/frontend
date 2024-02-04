import Login from 'pages/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import getTaskThunk from 'thunks/get-task-thunks';
import getUsersThunk from 'thunks/get-users-thunks';
import { TTask } from 'types/types';
import Lead from './Lead/Lead';
import styles from './Main.module.scss';
import User from './User/User';

const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.system);
  const isLead = useSelector((state) => state.user).is_team_lead;
  const tasks: TTask = useSelector((state) => state.task);
  console.log(isLoggedIn);
  console.log(isLead);
  // const isLead = true;
  useEffect(() => {
    dispatch(getTaskThunk(isLoggedIn));
    dispatch(getUsersThunk(isLoggedIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, tasks.results.length]);

  return (
    <main className={styles.main}>
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User />}
      {isLoggedIn && isLead && <Lead allTasks={tasks} />}
    </main>
  );
};
export default Main;
