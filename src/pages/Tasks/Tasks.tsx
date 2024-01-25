import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Tasks.module.scss';

import { TaskProps, Task } from '../../components/Task/Task';
import { TaskStateProps } from '../../components/TaskState/TaskState';

const Tasks: FC<TaskProps & TaskStateProps> = (props) => {
  // const tasksData: (TaskProps & TaskStateProps)[] = [
  //   {
  //     text: 'Здесь текст какой-нибудь задачи и если не хватит места, то при ховере она вот так может открываться целиком',
  //     date: '27 декабря, 15:00',
  //     headerText: 'Маша Васильева',
  //     startTime: '15:00',
  //     isLead: true,
  //     ownTask: true,
  //     movedTime: '',
  //     completedTime: '',
  //   },
  // ];

  return (
    <div className={styles.card}>
      {[props].map(() => (
        <Task key={uuidv4()} {...props} />
      ))}
    </div>
  );
};

export default Tasks;
