import Preloader from 'components/Preloader/Preloader';
import Login from 'pages/Login/Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'services/hooks';
import getTasksThunk from 'thunks/get-tasks-thunks';
import getUsersThunk from 'thunks/get-users-thunks';
import Lead from './Lead/Lead';
import styles from './Main.module.scss';
import User from './User/User';
import logoutUserThunk from '../../thunks/logout-user-thunk';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useSelector((state) => state.system);
  const isLead = useSelector((state) => state.user).is_team_lead;
  const tasks = useSelector((state) => state.tasks);
  const userID = useSelector((state) => state.user).id;
  const handleLogout = () => {
    dispatch(logoutUserThunk(navigate));
  };
  // const isLead = true;
  useEffect(() => {
    dispatch(getTasksThunk(isLoggedIn));
    dispatch(getUsersThunk(isLoggedIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  useEffect(() => {
    if (Number.isNaN(userID)) {
      handleLogout();
      console.log('выход');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userID]);

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
