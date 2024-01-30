import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PlusButton from 'ui-lib/Buttons/PlusButton/PlusButton';
import Search from 'components/Search/Search';
import avatar from '../../../assets/images/avatar.png';
import styles from './HeaderEmployer.module.scss';

const HeaderEmployer: FC = () => {
  const location = useLocation();

  const handleClassName = (path: string) =>
    `${styles.navLink} ${location.pathname === path ? styles.active : ''}`;

  return (
    <header className={styles.employer}>
      <div className={styles.container}>
        <div className={styles.user}>
          <button className={styles.user_button}>
            <img className={styles.user_photo} src={avatar} alt='Аватар пользователя' />
            <h1 className={styles.user_name}>Маша Васильева</h1>
          </button>
        </div>

        <ul className={styles.linkWrapper}>
          <li className={styles.navLi}>
            <Link className={handleClassName('/objectives')} to='/objectives'>
              Поставленные задачи
            </Link>
          </li>
          <li className={styles.navLi}>
            <Link className={handleClassName('/tasks')} to='/tasks'>
              Мои Задачи
            </Link>
          </li>
          <li className={styles.navLi}>
            <Link className={handleClassName('/requests')} to='/requests'>
              Запросы
              <span className={styles.count}>3</span>
            </Link>
          </li>
          <li className={styles.navLi}>
            <Link className={handleClassName('/archive')} to='/archive'>
              Архив
            </Link>
          </li>
        </ul>

        <div className={styles.search}>
          <Search />
        </div>

        <PlusButton />
      </div>
    </header>
  );
};

export default HeaderEmployer;
