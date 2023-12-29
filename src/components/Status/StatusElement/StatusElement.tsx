import { v4 as uuidv4 } from 'uuid';
import styles from '../Status.module.scss';

const StatusElement = (text: string) => {
  return (
    <div className={styles.element} key={uuidv4()}>
      {text}
    </div>
  );
};

export default StatusElement;
