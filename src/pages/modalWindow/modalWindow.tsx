import React from 'react';
import styles from './modalWindow.module.scss';

interface ModalWindowProps {
  onClose: () => void;
  title: string;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ onClose, title }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <button
            className={styles.buttonClose}
            type="button"
            aria-label="Кнопка закрыть"
            onClick={onClose}
          >
            X
          </button>
          <h2 className={styles.text}>{title || 'Модальное окно'}</h2>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
