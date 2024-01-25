import React from 'react';
import { ClockIcon, CommentsIcon, FlagIcon } from 'ui-lib/Icons';
import EditButton from 'ui-lib/Buttons/editTaskButton/editTaskButton';
import { TaskEditMenu } from 'components/TaskEditMenu/TaskEditMenu';
import styles from './Task.module.scss';

// содержимое карточки
export interface TaskProps {
  text: string;
  date: string;
  headerText: string;
  isLead: boolean | null;
  ownTask: boolean;
}

export const Task: React.FC<TaskProps> = ({
  text,
  date,
  headerText,
  isLead,
  ownTask,
}) => {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  const handleToggleEditMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleEditMenu();
    }
  };

  return (
    <div className={styles.container}>
      {/* Шапка отображается только для лида для не своей задачи */}
      {isLead && !ownTask && (
        <div className={styles.task_header}>
          <ClockIcon />
          <p className={styles.task_header_text}>{headerText}</p>
        </div>
      )}
      <div className={styles.task_body}>
        {/* Открытие меню редактирования */}
        {isMenuOpened && (
          <TaskEditMenu
            isLead={isLead}
            ownTask={ownTask}
            handleToggleEditMenu={handleToggleEditMenu}
          />
        )}

        <div className={styles.task}>
          <div className={styles.task_container}>
            <p className={styles.task_text}>{text}</p>
            <p className={styles.task_textFull}>{text}</p>
          </div>
          <div
            className={styles.buttons}
            onClick={handleToggleEditMenu}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <EditButton />
          </div>
        </div>

        <div className={styles.other}>
          <div className={styles.other_left}>
            <FlagIcon />
            <p className={styles.other_date}>{date}</p>
          </div>

          <div className={styles.other_right}>
            <CommentsIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
