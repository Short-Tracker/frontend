import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './PopupWrapper.module.scss';

export interface PopupWrapperProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}
const PopupWrapper: FC<PopupWrapperProps> = ({ children, isOpen, onClose }) => {
  const [overlay, setOverlay] = useState<Element | null>(null);

  useEffect(() => {
    setOverlay(document.querySelector(`.${styles.popupWrapper}`));
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  useEffect(() => {
    const onEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlay) {
      onClose();
    }
  };

  return createPortal(
    isOpen && (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <section
        className={styles.popupWrapper}
        style={{ display: isOpen ? 'block' : 'none' }}
        // onMouseDown={handleClickOverlay}
      >
        {children}
      </section>
    ),
    document.body
  );
};

export default PopupWrapper;
