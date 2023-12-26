import React from 'react';
import styles from './tasks.module.scss';

// содержимое карточки
interface TaskProps {
  /* name: string; */
  text: string;
  date: string;
  count: number;
}

// отслеживание статуса выполнения задачи
interface TaskStateProps {
  startTime: string;
  movedTime: string;
  completedTime: string;
}

const TaskState: React.FC<TaskStateProps> = ({ startTime, movedTime, completedTime }) => {
  return (
    <div className={styles.taskState}>
      <p className={styles.time}>13:50</p>
      <div className={styles.taskStateContainer}>
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

const Task: React.FC<TaskProps & TaskStateProps> = ({
  /* name, */
  text,
  date,
  count,
  startTime,
  movedTime,
  completedTime,
}) => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.user}>
        <p className={styles.name}>{name}</p>
      </div> */}

      <TaskState
        startTime={startTime}
        movedTime={movedTime}
        completedTime={completedTime}
      />

      <div className={styles.task}>
        <div className={styles.taskText}>
          <p className={styles.text}>{text}</p>
          <p className={styles.textFull}>{text}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.edit} />
          <button className={styles.copyLink} />
        </div>
      </div>

      <div className={styles.other}>
        <div className={styles.otherLeft}>
          <button className={styles.flag} />
          <p className={styles.date}>{date}</p>
        </div>

        <div className={styles.otherRight}>
          <span className={styles.count}>{count}</span>
          <button className={styles.commetns} />
        </div>
      </div>
    </div>
  );
};

const Tasks: React.FC = () => {
  const tasksData: (TaskProps & TaskStateProps)[] = [
    {
      /* name: 'Маша Васильева', */
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
      {tasksData.map((task, index) => (
        <Task key={index} {...task} />
      ))}
    </div>
  );
};

export default Tasks;
