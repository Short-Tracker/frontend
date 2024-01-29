import { lid } from 'assets/images'; // Initial image
import React from 'react';
import styles from './SidebarUser.module.scss';

type Tprops = {
  fullName: string;
};

const SideBarUser: React.FC<Tprops> = ({ fullName }) => {
  return (
    <li className={styles.memberWrapper}>
      <img className={styles.memberImg} src={lid} alt="Изображение пользователя" />
      <button className={styles.memberName}>{fullName}</button>
    </li>
  );
};

export default SideBarUser;
