import { FC, useState } from 'react';
import PlusButton from 'ui-lib/Buttons/PlusButton/PlusButton';
import Search from 'components/Search/Search';
import { useDispatch, useSelector } from 'services/hooks';
import SideBarUserMenu from 'components/SideBarUserMenu/SideBarUserMenu';
import { setContent } from 'store';
import avatar from '../../../assets/images/avatar.png';
import styles from './HeaderEmployer.module.scss';

const HeaderEmployer: FC = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);
  const user = useSelector((state) => state.user);

  const [isSidebarMenuOpen, setisSidebarMenuOpen] = useState(false);

  const handleClassName = (path: string) =>
    `${styles.navButton} ${content.currentContent === path ? styles.active : ''}`;

  const handleToggleMenu = () => {
    setisSidebarMenuOpen(!isSidebarMenuOpen);
  };

  return (
    <header className={styles.employer}>
      <div className={styles.container}>
        <div className={styles.user}>
          <button onClick={handleToggleMenu} className={styles.user_button}>
            <img className={styles.user_photo} src={avatar} alt='Аватар пользователя' />
            <h1 className={styles.user_name}>{`${user.first_name} ${user.last_name}`}</h1>
          </button>
          {isSidebarMenuOpen && <SideBarUserMenu setIsOpen={setisSidebarMenuOpen} />}
        </div>
        <ul className={styles.linkWrapper}>
          <li className={styles.navLi}>
            <button
              onClick={() => dispatch(setContent({ currentContent: 'objectives' }))}
              className={handleClassName('objectives')}
            >
              Поставленные задачи
            </button>
          </li>
          <li className={styles.navLi}>
            <button
              onClick={() => dispatch(setContent({ currentContent: 'tasks' }))}
              className={handleClassName('tasks')}
            >
              Мои Задачи
            </button>
          </li>
          <li className={styles.navLi}>
            <button
              onClick={() => dispatch(setContent({ currentContent: 'requests' }))}
              className={handleClassName('requests')}
            >
              Запросы
              <span className={styles.count}>3</span>
            </button>
          </li>
          <li className={styles.navLi}>
            <button
              onClick={() => dispatch(setContent({ currentContent: 'archive' }))}
              className={handleClassName('archive')}
            >
              Архив
            </button>
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
