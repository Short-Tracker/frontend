import { FC } from 'react';
// import { useSelector } from 'services/hooks';
import { Task, TaskProps } from '../../components/Task/Task';
import { TaskStateProps } from '../../components/TaskState/TaskState';
import styles from './Tasks.module.scss';

const Tasks: FC<TaskProps & TaskStateProps> = (props) => {
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
