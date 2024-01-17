import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideBarUser from 'components/SideBarUser/SideBarUser';
import { v4 as uuidv4 } from 'uuid';
import styles from './SideBar.module.scss';

const SideBar: React.FC = () => {
  const location = useLocation();

  const handleClassName = (path: string) =>
    `${styles.navLink} ${location.pathname === path ? styles.active : ''}`;

  return (
    <section className={styles.SideBar}>
      <div className={styles.userWrapper}>
        <img className={styles.userImg} src="#" alt="Изображение пользователя" />
        <h2 className={styles.userName}>Диана</h2>
      </div>
      <ul className={styles.linkWrapper}>
        <li className={styles.navLi}>
          <Link className={handleClassName('/')} to="/">
            Все задачи
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link className={handleClassName('/PersonalArea')} to="/PersonalArea">
            Личный кабинет
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link className={handleClassName('/requests')} to="/requests">
            Запросы
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link className={handleClassName('/tasks')} to="/tasks">
            Мои Задачи
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link className={handleClassName('/analytics')} to="/analytics">
            Аналитика
          </Link>
        </li>
        <li className={styles.navLi}>
          <Link className={handleClassName('/archive')} to="/archive">
            Архив
          </Link>
        </li>
      </ul>
      <div className={styles.teamWrapper}>
        <h2 className={styles.teamName}>Команда</h2>
        <button className={styles.teamImg} />
      </div>
      <ul className={styles.membersWrapper}>
        {[...Array(8)].map(() => {
          return <SideBarUser key={uuidv4()} />;
        })}
      </ul>
    </section>
  );
};

export default SideBar;
