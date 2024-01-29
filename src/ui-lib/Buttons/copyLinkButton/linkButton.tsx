import { FC } from 'react';
import { LinkIcon } from 'ui-lib/Icons';
import styles from './linkButton.module.scss';

const LinkButton: FC = () => {
  return (
    <button className={styles.linkButton} type='button'>
      <LinkIcon alt='Цепочка' width='12' height='12' className={styles.icon} />
    </button>
  );
};

export default LinkButton;
