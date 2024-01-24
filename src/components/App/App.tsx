import { Main, Login, Error } from 'pages';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import { useDispatch, useSelector } from 'services/hooks';
import { useEffect } from 'react';
import refreshTokenThunk from 'thunks/refresh-token-thunk';
import CreateTask from '../Popup/CreateTask/CreateTask';
import Popup from '../Popup/Popup';
import { closeModal } from '../../store';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const { createTaskModal } = useSelector((state) => state.modals);
  const closeModalState = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, [dispatch]);
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute path="/" />}>
          <Route element={<Main />} path="/main" />
        </Route>
        <Route path="/error" element={<Error />} />
      </Routes>
      <Popup onClose={closeModalState} isOpen={createTaskModal}>
        <CreateTask />
      </Popup>
    </div>
  );
};
export default App;
