import Login from 'pages/Login/Login';
import { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import getTaskThunk from 'thunks/get-task-thunks';
import getUsersThunk from 'thunks/get-users-thunks';
import { TTask } from 'types/types';
import RingLoader from 'react-spinners/RingLoader';
import Lead from './Lead/Lead';
import styles from './Main.module.scss';
import User from './User/User';

const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.system);
  const isLead = useSelector((state) => state.user).is_team_lead;
  const tasks: TTask = useSelector((state) => state.task);
  const override: CSSProperties = {
    position: 'absolute',
    left: '50vw',
    top: '50vh',
  };
  // const isLead = true;
  useEffect(() => {
    dispatch(getTaskThunk(isLoggedIn));
    dispatch(getUsersThunk(isLoggedIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, tasks.results.length]);
  return (
    <main className={styles.main}>
      {isLoading && (
        <RingLoader
          color='#5550e4'
          size={100}
          aria-label='Loading Spinner'
          data-testid='loader'
          speedMultiplier={0.5}
          loading={isLoading}
          cssOverride={override}
        />
      )}
      {!isLoggedIn && <Login />}
      {isLoggedIn && !isLead && <User allTasks={tasks} />}
      {isLoggedIn && isLead && <Lead allTasks={tasks} />}
    </main>
  );
};
export default Main;
