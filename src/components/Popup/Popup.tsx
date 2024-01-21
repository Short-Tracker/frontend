import { FC, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from 'store/modalSlice';
import { RootState } from 'types/store.types';
import { createPortal } from 'react-dom';
import styles from './Popup.module.scss';

interface IPopupProps extends PropsWithChildren {
  width?: string;
  height?: string;
  buttonText?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Popup: FC<IPopupProps> = ({
  width,
  height,
  buttonText,
  isOpen,
  onClose,
  children,
}) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modals.isOpen);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return createPortal(
    isOpen && (
      <section className={styles.popup} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className={styles.popup__container}>{children}</div>
      </section>
    ),
    document.body
  );
};

Popup.defaultProps = {
  width: '560px',
  height: 'min-content',
};

export default Popup;
