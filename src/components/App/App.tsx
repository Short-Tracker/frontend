import TaskWindow from 'components/Popup/TaskWindow/TaskWindow';
import TaskPage from 'components/TaskPage/TaskPage';
import { Error, ErrorServer, Login, Main } from 'pages';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import { useDispatch, useSelector } from 'services/hooks';
import refreshTokenThunk from 'thunks/refresh-token-thunk';
import { closeModal } from '../../store';
import CreateTask from '../Popup/CreateTask/CreateTask';
import Popup from '../Popup/Popup';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const { createTaskModal } = useSelector((state) => state.modals);
  const closeModalState = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, [dispatch]);
  return (
    <div className={styles.App}>
      <Routes location={background || location}>
        <Route path='/' element={<Login />} />
        <Route element={<PrivateRoute path='/' />}>
          <Route element={<Main />} path='/main' />
          <Route element={<TaskPage />} path='/tasks/:taskId' />
        </Route>
        <Route path='/error' element={<Error />} />
        <Route path='/error-server' element={<ErrorServer />} />
      </Routes>
      {background && location.pathname.match(/\/tasks\/.+/) && (
        <Routes>
          <Route element={<PrivateRoute path='/' />}>
            <Route element={<TaskWindow />} path='/tasks/:taskId' />
          </Route>
        </Routes>
      )}
      <Toaster />
      <Popup onClose={closeModalState} isOpen={createTaskModal}>
        <CreateTask />
      </Popup>
    </div>
  );
};
export default App;
