import { FC } from 'react';
import { FlagIcon } from 'ui-lib/Icons';
import styles from './flagButton.module.scss';

const FlagButton: FC = () => {
  return (
    <button className={styles.flagButton} type="button">
      <FlagIcon alt="Флаг" width="13" height="13" className={styles.icon} />
    </button>
  );
};

export default FlagButton;
