import { FC } from 'react';
import { EditIcon } from 'ui-lib/Icons';
import styles from './editTaskButton.module.scss';

const EditButton: FC = () => {
  return (
    <button className={styles.editButton} type="button">
      <EditIcon alt="Многоточие" width="16" height="16" className={styles.icon} />
    </button>
  );
};

export default EditButton;
