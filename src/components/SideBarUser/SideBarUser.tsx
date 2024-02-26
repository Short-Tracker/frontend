import { lid } from 'assets/images'; // Initial image
import React, { KeyboardEvent } from 'react';
import { useDispatch } from 'services/hooks';
import { getUserTasks } from 'store/tasksOfUserSlice';
import styles from './SidebarUser.module.scss';

type Tprops = {
  fullName: string;
  id: number;
};

const SideBarUser: React.FC<Tprops> = ({ fullName, id }) => {
  const dispatch = useDispatch();
  const getTasks = () => dispatch(getUserTasks({ id }));
  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      getTasks();
    }
  };
  return (
    <li className={styles.memberWrapper}>
      <img className={styles.memberImg} src={lid} alt='Изображение пользователя' />
      <button className={styles.memberName} onClick={getTasks} onKeyDown={handleKeyDown}>
        {fullName}
      </button>
    </li>
  );
};

export default SideBarUser;
