/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  AllTeamIcon,
  allTaskIcon,
  analyticsIcon,
  archiveIcon,
  myTaskIcon,
  requestIcon,
} from 'assets/icons';
import { lid } from 'assets/images'; // Initial image
import SideBarUser from 'components/SideBarUser/SideBarUser';
import SideBarUserMenu from 'components/SideBarUserMenu/SideBarUserMenu';
import NewEmployeePopup from 'components/Popup/NewEmployee/NewEmployee';
import React, { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import { getAllTeamTasks } from 'store/tasksOfUserSlice';
import { TtaskState } from 'types/types';
import { v4 as uuidv4 } from 'uuid';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.scss';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSelector((state) => state.user);
  const tasks: TtaskState = useSelector((state) => state.tasks);
  const currentUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isSidebarMenuOpen, setisSidebarMenuOpen] = useState(false);
  const [isNewEmployeePopupOpen, setIsNewEmployeePopupOpen] = useState(false);

  const activeMain = matchPath(location.pathname, '/main');
  // const activeMessages = matchPath(location.pathname, '/');
  // const activeMyTasks = matchPath(location.pathname, '/');
  const activeAnalitics = matchPath(location.pathname, '/task-analitics');
  // const activeArchive = matchPath(location.pathname, '/');

  const handleToggleMenu = () => {
    setisSidebarMenuOpen(!isSidebarMenuOpen);
  };

  const handleNewEmployeeButtonClick = () => {
    setIsNewEmployeePopupOpen(true);
  };

  const handleCancel = () => {
    setIsNewEmployeePopupOpen(false);
  };

  const showAllTasks = () => {
    dispatch(getAllTeamTasks());
    navigate('/main');
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      showAllTasks();
    }
  };

  const showAnalitics = () => {
    navigate('/task-analytics');
  };

  return (
    <section className={styles.SideBar}>
      <div onClick={handleToggleMenu} className={styles.userWrapper}>
        <img className={styles.userImg} src={lid} alt='Изображение пользователя' />
        <h2 className={styles.userName}>
          {`${currentUser.first_name} ${currentUser.last_name}`}
        </h2>
        {isSidebarMenuOpen && <SideBarUserMenu setIsOpen={setisSidebarMenuOpen} />}
      </div>

      <ul className={styles.linkWrapper}>
        <li className={`${styles.navLi} ${activeMain ? styles.navLiActive : undefined}`}>
          <img
            src={allTaskIcon}
            className={`${styles.navImage} ${styles.navImageActive}`}
            alt='иконка'
          />
          <button type='button' className={styles.navButton} onClick={showAllTasks}>
            Все задачи
          </button>
        </li>
        <li className={styles.navLi}>
          <img src={requestIcon} className={styles.navImage} alt='иконка' />
          <button type='button' className={styles.navButton}>
            Запросы
          </button>
          {tasks.count > 0 ? (
            <span className={styles.requestSpan}>{tasks.count}</span>
          ) : null}
        </li>
        <li className={styles.navLi}>
          <img src={myTaskIcon} className={styles.navImage} alt='иконка' />
          <button type='button' className={styles.navButton}>
            Мои Задачи
          </button>
        </li>
        <li
          className={`${styles.navLi} ${
            activeAnalitics ? styles.navLiActive : undefined
          }`}
        >
          <img src={analyticsIcon} className={styles.navImage} alt='иконка' />
          <button type='button' className={styles.navButton} onClick={showAnalitics}>
            Аналитика
          </button>
        </li>
        <li className={styles.navLi}>
          <img src={archiveIcon} className={styles.navImage} alt='иконка' />
          <button type='button' className={styles.navButton}>
            Архив
          </button>
        </li>
      </ul>
      <div className={styles.teamWrapper}>
        <h2 className={styles.teamName}>Команда</h2>
        <button className={styles.teamImg} onClick={handleNewEmployeeButtonClick} />
      </div>
      <ul className={styles.membersWrapper}>
        <li className={styles.teamLi}>
          <img src={AllTeamIcon} className={styles.navImage} alt='иконка' />
          <button
            className={styles.allTeamButton}
            onClick={showAllTasks}
            onKeyDown={handleKeyDown}
          >
            Вся команда
          </button>
        </li>
        {currentUsers.results.map((user) => {
          return <SideBarUser fullName={user.first_name} id={user.id} key={uuidv4()} />;
        })}
      </ul>
      {isNewEmployeePopupOpen && <NewEmployeePopup closePopup={handleCancel} />}
    </section>
  );
};

export default SideBar;
