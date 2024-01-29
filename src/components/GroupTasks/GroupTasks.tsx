import React, { useState } from 'react';
import { ListIcon } from 'ui-lib/Icons';
import styles from './GroupTasks.module.scss';

const GroupTasks = () => {
  // Используем хук состояния для отслеживания состояния свернута/развернута
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Обработчик клика для сворачивания/разворачивания
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Обработчик клавиатурных событий для поддержки доступности
  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleCollapse();
    }
  };

  // Хардкодим список пользователей
  const users = [
    {
      name: 'User1',
      id: 1,
    },
    {
      name: 'User2',
      id: 2,
    },
    {
      name: 'User3',
      id: 3,
    },
    {
      name: 'User4',
      id: 4,
    },
    {
      name: 'User5',
      id: 5,
    },
  ];

  return (
    <div
      className={styles.groupTasks}
      role='button'
      tabIndex={0}
      onClick={handleToggleCollapse}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <ListIcon />
        <h2 className={styles.customHeading}>Командная (5/8)</h2>
      </div>
      {/* Показываем содержимое только если не свернуто */}
      {!isCollapsed && (
        <div className={styles.taskList}>
          {/* Мапим пользователей для создания карточек задач */}
          {users.map((user) => (
            <div key={user.id} className={styles.taskUser}>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupTasks;
