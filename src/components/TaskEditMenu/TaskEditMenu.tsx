/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { TaskStatus } from 'types/types';
import { UniversalButton } from 'ui-lib/Buttons';
import { BallpenIcon, TrashIcon } from 'ui-lib/Icons';
import { useClose, useDispatch } from '../../services/hooks';
import updateTaskThunk from '../../thunks/update-task-thunk';
import styles from './TaskEditMenu.module.scss';
// import { changeTaskStatus } from '../../store/taskSlice';

export interface TaskEditMenuProps {
  ownTask: boolean;
  handleToggleEditMenu: () => void;
  handleCloseEditMenu: () => void;
  status: string;
  taskID: number;
  deadlineDate: string;
  description: string;
  taskCreatorId: number;
  isCurrentUserLead: boolean;
  currentUserId: number;
}

export const TaskEditMenu: React.FC<TaskEditMenuProps> = ({
  ownTask,
  handleToggleEditMenu,
  handleCloseEditMenu,
  status,
  deadlineDate,
  description,
  taskID,
  taskCreatorId,
  isCurrentUserLead,
  currentUserId,
}) => {
  const [currentStatus, setStatus] = React.useState(status);
  const dispatch = useDispatch();
  useClose(styles.container, handleCloseEditMenu);

  const isTaskEditable = currentUserId === taskCreatorId;
  const isStatusEditable = isTaskEditable || ownTask;

  const isArchivedVisible =
    status === TaskStatus.ARCHIVED || (status === TaskStatus.DONE && isCurrentUserLead);
  const isHoldVisible = status === TaskStatus.HOLD || status === TaskStatus.IN_PROGRESS;
  const isDoneVisible = status === TaskStatus.DONE || status === TaskStatus.IN_PROGRESS;
  const isInProgressVisible =
    status === TaskStatus.IN_PROGRESS || status === TaskStatus.TO_DO;
  const isToDoVisible =
    status === TaskStatus.TO_DO || (status === TaskStatus.ARCHIVED && isCurrentUserLead);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(evt.target.value);
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleEditMenu();
    }
  };

  const updateTaskStatus = () => {
    dispatch(
      updateTaskThunk({
        id: taskID,
        data: {
          description,
          status: currentStatus,
          deadline_date: deadlineDate,
          // performers,
          performers: [2],
        },
      })
    );
  };

  return (
    <div className={styles.container}>
      {/* Кнопки отображаются у лида для задачи сотруднику, */}
      {/* а также у лида и сотрудника для своей задачи */}
      {isTaskEditable && (
        <div className={styles.edit_buttons}>
          <div
            className={styles.edit_button}
            onClick={handleToggleEditMenu}
            role='button'
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <BallpenIcon />
            Редактировать
          </div>
          {(status === TaskStatus.DONE || status === TaskStatus.ARCHIVED) && (
            <div
              className={styles.edit_button}
              onClick={handleToggleEditMenu}
              role='button'
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <TrashIcon />
              Удалить
            </div>
          )}
        </div>
      )}
      {/* Смена статуса отображаются для своих задач */}
      {/* и задачи у сотрудника от лида */}
      {isStatusEditable && (
        <form className={styles.status}>
          {isToDoVisible && (
            <label className={styles.status_radiobutton}>
              <input
                className={styles.status_radiobutton_input}
                type='radio'
                value={TaskStatus.TO_DO}
                checked={currentStatus === TaskStatus.TO_DO}
                onChange={onChange}
              />
              Todo
            </label>
          )}
          {isInProgressVisible && (
            <label className={styles.status_radiobutton}>
              <input
                className={styles.status_radiobutton_input}
                type='radio'
                value={TaskStatus.IN_PROGRESS}
                checked={currentStatus === TaskStatus.IN_PROGRESS}
                onChange={onChange}
              />
              In progress
            </label>
          )}
          {isDoneVisible && (
            <label className={styles.status_radiobutton}>
              <input
                className={styles.status_radiobutton_input}
                type='radio'
                value={TaskStatus.DONE}
                checked={currentStatus === TaskStatus.DONE}
                onChange={onChange}
              />
              Done
            </label>
          )}
          {isHoldVisible && (
            <label className={styles.status_radiobutton}>
              <input
                className={styles.status_radiobutton_input}
                type='radio'
                value={TaskStatus.HOLD}
                checked={currentStatus === TaskStatus.HOLD}
                onChange={onChange}
              />
              Hold
            </label>
          )}
          {isArchivedVisible && (
            <label className={styles.status_radiobutton}>
              <input
                className={styles.status_radiobutton_input}
                type='radio'
                value={TaskStatus.ARCHIVED}
                checked={currentStatus === TaskStatus.ARCHIVED}
                onChange={onChange}
              />
              Archived
            </label>
          )}
          <UniversalButton
            className={styles.status_button}
            type='button'
            onClick={updateTaskStatus}
            disabled={status === currentStatus}
          >
            <p className={styles.status_button_text}>Переместить</p>
          </UniversalButton>
        </form>
      )}
    </div>
  );
};
