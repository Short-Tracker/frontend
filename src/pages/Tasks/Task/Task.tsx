import React from 'react';
import FlagButton from 'ui-lib/Buttons/flagButton/flagButton';
import CommentsButton from 'ui-lib/Buttons/commentsButton/commentsButton';
import LinkButton from 'ui-lib/Buttons/copyLinkButton/linkButton';
import EditButton from 'ui-lib/Buttons/editTaskButton/editTaskButton';
import { TaskStateProps, TaskState } from '../TaskState/TaskState';
import styles from './Task.module.scss';

// содержимое карточки
export interface TaskProps {
  text: string;
  date: string;
  count: number;
}

export const Task: React.FC<TaskProps & TaskStateProps> = ({
  text,
  date,
  count,
  startTime,
  movedTime,
  completedTime,
}) => {
  return (
    <div className={styles.container}>
      <TaskState
        startTime={startTime}
        movedTime={movedTime}
        completedTime={completedTime}
      />

      <div className={styles.task}>
        <div className={styles.task_container}>
          <p className={styles.task_text}>{text}</p>
          <p className={styles.task_textFull}>{text}</p>
        </div>
        <div className={styles.buttons}>
          <EditButton />
          <LinkButton />
        </div>
      </div>

      <div className={styles.other}>
        <div className={styles.other_left}>
          <FlagButton />
          <p className={styles.other_date}>{date}</p>
        </div>

        <div className={styles.other_right}>
          <span className={styles.other_count}>{count}</span>
          <CommentsButton />
        </div>
      </div>
    </div>
  );
};
