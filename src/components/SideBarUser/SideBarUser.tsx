import React from 'react';
import { lid } from 'assets/images'; // Initial image
import styles from './SidebarUser.module.scss';

const SideBarUser: React.FC = () => {
  return (
    <li className={styles.memberWrapper}>
      <img className={styles.memberImg} src={lid} alt="Изображение пользователя" />
      <button className={styles.memberName}>Виктория Смирнова</button>
    </li>
  );
};

export default SideBarUser;
