import { TaskEditMenu } from 'components/TaskEditMenu/TaskEditMenu';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { buttonize, getDateString } from 'services/functions';
import { useSelector } from 'services/hooks';
import { resetActiveMenu, setActiveMenu } from 'store/taskMenuActiveSlice';
import EditButton from 'ui-lib/Buttons/editTaskButton/editTaskButton';
import { ClockIcon, CommentsIcon, FlagIcon, FlagIconExpired } from 'ui-lib/Icons';
import styles from './Task.module.scss';

// содержимое карточки
export interface TaskProps {
  text: string;
  date: string;
  headerText: string;
  ownTask: boolean;
  status: string;
  taskID: number;
  completedTime: string;
  taskCreatorId: number;
  isCurrentUserLead: boolean;
  currentUserId: number;
  performer: number;
}

export const Task: React.FC<TaskProps> = ({
  text,
  date,
  headerText,
  ownTask,
  status,
  taskID,
  completedTime,
  taskCreatorId,
  isCurrentUserLead,
  currentUserId,
  performer,
}) => {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const usersResult = useSelector((store) => store.users).results; // Юзеры
  const performerName = usersResult.find((u) => u.id === performer); // перформер задачи

  const taskMenuActiveId = useSelector((state) => state.taskMenuActive).id;

  const completedTimeDate = new Date(completedTime);
  const createDate = new Date(date);

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

  const handleOpenTask = (evt: React.KeyboardEvent) => {
    navigate(`/tasks/${taskID}`, { state: { background: location } });
  };

  return (
    <div className={styles.container}>
      {/* Шапка отображается только для лида для не своей задачи */}
      {isCurrentUserLead && currentUserId !== performer && (
        <div className={styles.task_header}>
          <p className={styles.task_header_id}>{`#${taskID}`}</p>
          <ClockIcon />
          <p
            className={styles.task_header_text}
          >{`${performerName?.first_name} ${performerName?.last_name}`}</p>
        </div>
      )}
      <div className={styles.task_body}>
        {/* Открытие меню редактирования */}
        {isMenuOpened && (
          <TaskEditMenu
            ownTask={ownTask}
            handleToggleEditMenu={handleToggleEditMenu}
            handleCloseEditMenu={handleCloseEditMenu}
            status={status}
            taskID={taskID}
            deadlineDate={completedTime}
            description={text}
            taskCreatorId={taskCreatorId}
            isCurrentUserLead={isCurrentUserLead}
            currentUserId={currentUserId}
            performer={performer}
          />
        )}

        <div className={styles.task}>
          <div className={styles.task_container} {...buttonize(handleOpenTask)}>
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
            {completedTimeDate > new Date() ? (
              <FlagIcon />
            ) : (
              <FlagIconExpired width='14' height='14' />
            )}
            <p
              className={
                completedTimeDate > new Date()
                  ? styles.other_date
                  : styles.other_date_expired
              }
            >
              {getDateString(createDate)}
            </p>
          </div>

          <div className={styles.other_right}>
            <CommentsIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
// expired
