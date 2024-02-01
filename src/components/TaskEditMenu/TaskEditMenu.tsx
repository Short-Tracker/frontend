/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
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
    status === 'archived' || (status === 'done' && isCurrentUserLead);
  const isHoldVisible = status === 'hold' || status === 'in progress';
  const isDoneVisible = status === 'done' || status === 'in progress';
  const isInProgressVisible = status === 'in progress' || status === 'to do';
  const isToDoVisible =
    status === 'to do' || (status === 'archived' && isCurrentUserLead);

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
          {(status === 'done' || status === 'archived') && (
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
                value='to do'
                checked={currentStatus === 'to do'}
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
                value='in progress'
                checked={currentStatus === 'in progress'}
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
                value='done'
                checked={currentStatus === 'done'}
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
                value='hold'
                checked={currentStatus === 'hold'}
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
                value='archived'
                checked={currentStatus === 'archived'}
                onChange={onChange}
              />
              Hold
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
