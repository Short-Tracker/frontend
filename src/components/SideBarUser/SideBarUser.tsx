import React from 'react';
import styles from './SidebarUser.module.scss';

const SideBarUser: React.FC = () => {
  return (
    <li className={styles.memberWrapper}>
      <img className={styles.memberImg} src="#" alt="Изображение пользователя" />
      <p className={styles.memberName}>Виктория Смирнова</p>
    </li>
  );
};

export default SideBarUser;
