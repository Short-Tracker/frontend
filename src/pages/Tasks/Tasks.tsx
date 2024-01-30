import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
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
        // eslint-disable-next-line react/destructuring-assignment
        <Task key={props.taskID} {...props} />
      ))}
    </div>
  );
};

export default Tasks;
