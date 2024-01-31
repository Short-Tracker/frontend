import { TaskEditMenu } from 'components/TaskEditMenu/TaskEditMenu';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'services/hooks';
import { resetActiveMenu, setActiveMenu } from 'store/taskMenuActiveSlice';
import EditButton from 'ui-lib/Buttons/editTaskButton/editTaskButton';
import { ClockIcon, CommentsIcon, FlagIcon } from 'ui-lib/Icons';
import { TPerformers } from '../../types/types';
import styles from './Task.module.scss';

// содержимое карточки
export interface TaskProps {
  text: string;
  date: string;
  headerText: string;
  isLead: boolean | null;
  ownTask: boolean;
  status: string;
  taskID: number;
  performers: TPerformers[];
  completedTime: string;
}

export const Task: React.FC<TaskProps> = ({
  text,
  date,
  headerText,
  isLead,
  ownTask,
  status,
  taskID,
  performers,
  completedTime,
}) => {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const dispatch = useDispatch();
  const taskMenuActiveId = useSelector((state) => state.taskMenuActive).value;

  const handleToggleEditMenu = () => {
    if (isMenuOpened) {
      setIsMenuOpened(false);
      dispatch(resetActiveMenu());
    } else {
      setIsMenuOpened(true);
      dispatch(setActiveMenu(taskID));
    }
  };

  const handleCloseEditMenu = () => {
    setIsMenuOpened(false);
  };

  useEffect(() => {
    if (taskMenuActiveId !== taskID && isMenuOpened) {
      setIsMenuOpened(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskMenuActiveId, isMenuOpened]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
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
            handleCloseEditMenu={handleCloseEditMenu}
            status={status}
            taskID={taskID}
            performers={performers}
            deadlineDate={completedTime}
            description={text}
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
            role='button'
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
