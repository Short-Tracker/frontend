import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Tasks.module.scss';

import { TaskProps, Task } from '../../components/Task/Task';
import { TaskStateProps } from '../../components/TaskState/TaskState';
import { TResults } from '../../types/types';

interface ITask {
  key: string;
  tasksData: TResults;
}

const Tasks: FC<ITask> = ({ key, tasksData }) => {
  // const tasksDataReformat: (TaskProps & TaskStateProps)[] = [
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
  const tasksDataReformat: (TaskProps &
    TaskStateProps & { taskID: string; status: string })[] = [
    {
      text: tasksData.description,
      date: tasksData.create_date,
      headerText: tasksData.creator.full_name,
      startTime: '15:00',
      isLead:
        tasksData.creator.is_team_lead === null ? true : tasksData.creator.is_team_lead,
      ownTask: true,
      movedTime: '',
      completedTime: '',
      taskID: '',
      status: tasksData.status,
    },
  ];

  return (
    <div className={styles.card}>
      {tasksDataReformat.map((task) => (
        <Task key={uuidv4()} {...task} />
      ))}
    </div>
  );
};

export default Tasks;
