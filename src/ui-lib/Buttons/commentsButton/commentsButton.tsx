import { FC } from 'react';
import { CommentsIcon } from 'ui-lib/Icons';
import styles from './commentsButton.module.scss';

const CommentsButton: FC = () => {
  return (
    <button className={styles.commentsButton} type='button'>
      <CommentsIcon
        alt='Текстовое сообщение'
        width='16'
        height='16'
        className={styles.icon}
      />
    </button>
  );
};

export default CommentsButton;
