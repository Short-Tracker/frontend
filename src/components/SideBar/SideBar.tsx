/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import SideBarUser from 'components/SideBarUser/SideBarUser';
import { v4 as uuidv4 } from 'uuid';
import { lid } from 'assets/images'; // Initial image
import {
  allTaskIcon,
  requestIcon,
  myTaskIcon,
  archiveIcon,
  analyticsIcon,
  AllTeamIcon,
} from 'assets/icons';
import SideBarUserMenu from 'components/SideBarUserMenu/SideBarUserMenu';
import styles from './SideBar.module.scss';

const SideBar: React.FC = () => {
  const [isSidebarMenuOpen, setisSidebarMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setisSidebarMenuOpen(!isSidebarMenuOpen);
  };

  const handleCloseMenu = () => {
    setisSidebarMenuOpen(false);
  };

  const handleEscapeClick = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
    };
  });

  return (
    <section className={styles.SideBar}>
      <div onClick={handleToggleMenu} className={styles.userWrapper}>
        <img className={styles.userImg} src={lid} alt="Изображение пользователя" />
        <h2 className={styles.userName}>Диана Наумова</h2>
        <SideBarUserMenu isOpen={isSidebarMenuOpen} />
      </div>
      <ul className={styles.linkWrapper}>
        <li className={`${styles.navLi} ${styles.navLiActive}`}>
          <img
            src={allTaskIcon}
            className={`${styles.navImage} ${styles.navImageActive}`}
            alt="иконка"
          />
          <button type="button" className={styles.navButton}>
            Все задачи
          </button>
        </li>
        <li className={styles.navLi}>
          <img src={requestIcon} className={styles.navImage} alt="иконка" />
          <button type="button" className={styles.navButton}>
            Запросы
          </button>
          <span className={styles.requestSpan}>97</span>
        </li>
        <li className={styles.navLi}>
          <img src={myTaskIcon} className={styles.navImage} alt="иконка" />
          <button type="button" className={styles.navButton}>
            Мои Задачи
          </button>
        </li>
        <li className={styles.navLi}>
          <img src={analyticsIcon} className={styles.navImage} alt="иконка" />
          <button type="button" className={styles.navButton}>
            Аналитика
          </button>
        </li>
        <li className={styles.navLi}>
          <img src={archiveIcon} className={styles.navImage} alt="иконка" />
          <button type="button" className={styles.navButton}>
            Архив
          </button>
        </li>
      </ul>
      <div className={styles.teamWrapper}>
        <h2 className={styles.teamName}>Команда</h2>
        <button className={styles.teamImg} />
      </div>
      <ul className={styles.membersWrapper}>
        <li className={styles.teamLi}>
          <img src={AllTeamIcon} className={styles.navImage} alt="иконка" />
          <button className={styles.allTeamButton}>Вся команда</button>
        </li>
        {[...Array(31)].map(() => {
          return <SideBarUser key={uuidv4()} />;
        })}
      </ul>
    </section>
  );
};

export default SideBar;
