import TaskPage from 'components/TaskPage/TaskPage';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClose } from 'services/hooks';
import styles from '../../TaskPage/TaskPage.module.scss';

const TaskWindow: FC = () => {
  const navigate = useNavigate();
  useClose(styles.task__wrapper, () => navigate(-1));
  return <TaskPage isWindow />;
};

export default TaskWindow;
