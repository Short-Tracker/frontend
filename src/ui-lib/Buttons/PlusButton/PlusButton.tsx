import { FC } from 'react';
import { PlusIcon } from 'ui-lib/Icons';
import styles from './PlusButton.module.scss';

const PlusButton: FC = () => {
  return (
    <button className={styles.plusButton} type="button">
      <PlusIcon alt="Добавить" width="18" height="18" className={styles.icon} />
    </button>
  );
};

export default PlusButton;
