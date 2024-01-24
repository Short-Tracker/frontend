import { Main, Login, Error } from 'pages';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import { useDispatch, useSelector } from 'services/hooks';
import { useEffect } from 'react';
import refreshTokenThunk from 'thunks/refresh-token-thunk';
import { Toaster } from 'react-hot-toast';
<<<<<<< HEAD
import CreateTask from '../Popup/CreateTask/CreateTask';
import Popup from '../Popup/Popup';
import { closeModal } from '../../store';
=======
>>>>>>> e939b11202bd8bedea68871c6fd38c9cad54b802
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
      <Toaster />
<<<<<<< HEAD
      <Popup onClose={closeModalState} isOpen={createTaskModal}>
        <CreateTask />
      </Popup>
=======
>>>>>>> e939b11202bd8bedea68871c6fd38c9cad54b802
    </div>
  );
};
export default App;
