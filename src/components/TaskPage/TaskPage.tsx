import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'services/hooks';
import { UniversalButton } from 'ui-lib/Buttons';
import { ClockIcon, FlagIcon } from 'ui-lib/Icons';
import { getDateString } from 'services/functions';
import styles from './TaskPage.module.scss';

interface ITaskPageProps {
  isWindow?: boolean;
}

const TaskPage: FC<ITaskPageProps> = ({ isWindow }) => {
  const tasks = useSelector((state) => state.tasks);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const OnClosePath = isWindow ? -1 : '/main';

  const thisTask = [
    ...(tasks.toDo ? tasks.toDo.results : []),
    ...(tasks.inProgress ? tasks.inProgress.results : []),
    ...(tasks.done ? tasks.done.results : []),
    ...(tasks.hold ? tasks.hold.results : []),
  ].find((task) => taskId && task.id === +taskId);

  const completedTimeDate = new Date(
    thisTask?.deadline_date === undefined ? '' : thisTask?.deadline_date
  );
  const createDate = new Date(
    thisTask?.create_date === undefined ? '' : thisTask?.create_date
  );

  if (!thisTask) return <Navigate to='/' />;
  return (
    <form className={styles.task}>
      <div
        className={`${styles.task__wrapper} ${
          !isWindow ? styles.task__wrapper_page : ''
        }`}
      >
        <div className={styles.task__header}>
          <ClockIcon />
          <p
            className={styles.task__headerText}
          >{`${thisTask.creator.first_name} ${thisTask.creator.last_name}`}</p>
        </div>
        <div className={styles.task__content}>
          <p className={styles.task__description}>{thisTask.description}</p>
          <div className={styles.task__otherWrapper}>
            <div className={styles.task__other}>
              <FlagIcon />
              <p className={styles.task__otherDate}>{`${getDateString(
                createDate
              )} - ${getDateString(completedTimeDate)}`}</p>
              <p className={styles.task__link}>{thisTask.link}</p>
            </div>
          </div>
          <div className={styles.task__commentWrapper}>
            <textarea
              className={styles.task__textarea}
              placeholder='Введите комментарий...'
            />
            <div className={styles.task__buttons}>
              <UniversalButton type='button'>
                <p className={styles.task__button}>Отправить</p>
              </UniversalButton>
              <UniversalButton
                className={styles.task__button}
                type='button'
                isFilled={false}
                onClick={() => navigate(OnClosePath as string)}
              >
                <p className={styles.status_button_text}>
                  {isWindow ? 'Закрыть' : 'На главную'}
                </p>
              </UniversalButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

TaskPage.defaultProps = {
  isWindow: false,
};

export default TaskPage;
