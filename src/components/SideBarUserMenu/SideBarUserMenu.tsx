import { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClose, useDispatch } from 'services/hooks';
import logoutUserThunk from 'thunks/logout-user-thunk';
import styles from './SideBarUserMenu.module.scss';

type TProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SideBarUserMenu: FC<TProps> = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUserThunk(navigate));
  };
  const handleClose = () => setIsOpen(false);
  useClose(styles.section, handleClose);

  return (
    <section className={styles.section}>
      <button type='button' className={styles.button}>
        Личный кабинет
      </button>
      <button className={styles.button} onClick={handleLogout}>
        Выход
      </button>
    </section>
  );
};

export default SideBarUserMenu;
