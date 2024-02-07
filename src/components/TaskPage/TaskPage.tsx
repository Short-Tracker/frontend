import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'services/hooks';
import { TTask } from 'types/types';
import { UniversalButton } from 'ui-lib/Buttons';
import { ClockIcon, FlagIcon } from 'ui-lib/Icons';
import styles from './TaskPage.module.scss';

interface ITaskPageProps {
  isWindow?: boolean;
}

const TaskPage: FC<ITaskPageProps> = ({ isWindow }) => {
  const { results }: TTask = useSelector((state) => state.task);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const OnClosePath = isWindow ? -1 : '/main';
  const thisTask = results.find((task) => taskId && task.id === +taskId);
  console.log(thisTask);

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
              <p
                className={styles.task__otherDate}
              >{`${thisTask.create_date} - ${thisTask.deadline_date}`}</p>
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
