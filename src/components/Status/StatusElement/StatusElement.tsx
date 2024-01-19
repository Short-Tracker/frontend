import { v4 as uuidv4 } from 'uuid';
import styles from '../Status.module.scss';

interface StatusElementProps {
  text: string;
  className: string;
}

const StatusElement = ({ text, className }: StatusElementProps) => {
  return (
    <div className={`${styles.element} ${styles[className]}`} key={uuidv4()}>
      {text}
    </div>
  );
};

export default StatusElement;
