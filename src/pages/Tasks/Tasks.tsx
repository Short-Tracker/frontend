import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Tasks.module.scss';

import { TaskProps, Task } from './Task/Task';
import { TaskStateProps } from './TaskState/TaskState';

const Tasks: FC = () => {
  const tasksData: (TaskProps & TaskStateProps)[] = [
    {
      text: 'Здесь текст какой-нибудь задачи и если не хватит места, то при ховере она вот так может открываться целиком',
      date: '27 декабря 15:00',
      count: 6,
      startTime: '15:00',
      movedTime: '',
      completedTime: '',
    },
  ];

  return (
    <div className={styles.card}>
      {tasksData.map((task) => (
        <Task key={uuidv4()} {...task} />
      ))}
    </div>
  );
};

export default Tasks;
