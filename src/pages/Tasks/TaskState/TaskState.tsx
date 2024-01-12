import React from 'react';
import styles from './TaskState.module.scss';

// отслеживание статуса выполнения задачи
export interface TaskStateProps {
  startTime: string;
  movedTime: string;
  completedTime: string;
}

export const TaskState: React.FC<TaskStateProps> = ({
  startTime,
  movedTime,
  completedTime,
}) => {
  return (
    <div className={styles.taskState}>
      <p className={styles.taskState_time}>13:50</p>
      <div className={styles.taskState_container}>
        <div className={`${styles.dot} ${startTime ? styles.active : ''}`} />
        {movedTime || <div className={styles.line} />}
        <div
          className={`${styles.dot} ${movedTime ? styles.active : ''}`}
          title={`Moved at ${movedTime}`}
        />
        {completedTime || <div className={styles.line} />}
        <div
          className={`${styles.dot} ${completedTime ? styles.active : ''}`}
          title={`Completed at ${completedTime}`}
        />
      </div>
    </div>
  );
};
