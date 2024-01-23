import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutUserThunk from 'thunks/logout-user-thunk';
import { useDispatch } from 'services/hooks';
import styles from './SideBarUserMenu.module.scss';

type TProps = {
  isOpen?: boolean;
};

const SideBarUserMenu: FC<TProps> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUserThunk(navigate));
  };
  return (
    <section className={`${!isOpen ? styles.sectionClose : styles.section}`}>
      <button type="button" className={styles.button}>
        Личный кабинет
      </button>
      <button className={styles.button} onClick={handleLogout}>
        Выход
      </button>
    </section>
  );
};

SideBarUserMenu.defaultProps = {
  isOpen: false,
};

export default SideBarUserMenu;
