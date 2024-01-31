import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import { CloseIcon } from 'ui-lib/Icons';
import styles from './ErrorPopup.module.scss';

interface ErrorPopupProps {
  onClose: () => void;
  onReload: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ onClose, onReload }) => {
  return (
    <div className={styles.errorPopup}>
      <button className={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </button>
      <h1 className={styles.title}>Произошла техническая ошибка</h1>
      <UniversalButton
        className={styles.customUniversalButton}
        fontSize={12}
        isFilled={false}
        onClick={onReload}
      >
        Перезагрузить
      </UniversalButton>
    </div>
  );
};

export default ErrorPopup;
