/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import { BallpenIcon, TrashIcon } from 'ui-lib/Icons';
import styles from './TaskEditMenu.module.scss';

export interface TaskEditMenuProps {
  isLead: boolean;
  ownTask: boolean;
  handleToggleEditMenu: () => void;
  status: string;
}

export const TaskEditMenu: React.FC<TaskEditMenuProps> = ({
  isLead,
  ownTask,
  handleToggleEditMenu,
  status,
}) => {
  const notOwnLeadTask = isLead && !ownTask;
  const notOwnPerformerTask = !isLead && !ownTask;

  const [currentStatus, setStatus] = React.useState(status);
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(evt.target.value);
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleEditMenu();
    }
  };

  return (
    <div className={styles.container}>
      {/* Кнопки отображаются у лида для задачи сотруднику, */}
      {/* а также у лида и сотрудника для своей задачи */}
      {/* как применить условие ИЛИ? */}
      {(notOwnLeadTask || ownTask) && (
        <div className={styles.edit_buttons}>
          <div
            className={styles.edit_button}
            onClick={handleToggleEditMenu}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <BallpenIcon />
            Редактировать
          </div>
          <div
            className={styles.edit_button}
            onClick={handleToggleEditMenu}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <TrashIcon />
            Удалить
          </div>
        </div>
      )}
      {/* Смена статуса отображаются для своих задач */}
      {/* и задачи у сотрудника от лида */}
      {(notOwnPerformerTask || ownTask) && (
        <form className={styles.status}>
          <label className={styles.status_radiobutton}>
            <input
              className={styles.status_radiobutton_input}
              type="radio"
              value="Todo"
              checked={currentStatus === 'to do'}
              onChange={onChange}
            />
            Todo
          </label>
          <label className={styles.status_radiobutton}>
            <input
              className={styles.status_radiobutton_input}
              type="radio"
              value="InProgress"
              checked={currentStatus === 'in progress'}
              onChange={onChange}
            />
            In progress
          </label>
          <label className={styles.status_radiobutton}>
            <input
              className={styles.status_radiobutton_input}
              type="radio"
              value="Done"
              checked={currentStatus === 'done'}
              onChange={onChange}
            />
            Done
          </label>
          <label className={styles.status_radiobutton}>
            <input
              className={styles.status_radiobutton_input}
              type="radio"
              value="Archived"
              checked={currentStatus === 'archived'}
              onChange={onChange}
            />
            Archived
          </label>
          <label className={styles.status_radiobutton}>
            <input
              className={styles.status_radiobutton_input}
              type="radio"
              value="Hold"
              checked={currentStatus === 'hold'}
              onChange={onChange}
            />
            Hold
          </label>
          <UniversalButton className={styles.status_button}>
            <p className={styles.status_button_text}>Переместить</p>
          </UniversalButton>
        </form>
      )}
    </div>
  );
};
