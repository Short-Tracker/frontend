import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBarUserMenu.module.scss';

type TProps = {
  isOpen?: boolean;
};

const SideBarUserMenu: FC<TProps> = ({ isOpen }) => {
  return (
    <section className={`${!isOpen ? styles.sectionClose : styles.section}`}>
      <button type="button" className={styles.button}>
        Личный кабинет
      </button>
      <Link to="/login" className={styles.button}>
        Выход
      </Link>
    </section>
  );
};

SideBarUserMenu.defaultProps = {
  isOpen: false,
};

export default SideBarUserMenu;
