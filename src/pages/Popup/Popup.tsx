import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from 'store/modalSlice';
import { RootState } from 'store/store';
import styles from './Popup.module.scss';

const Popup: FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modals.isOpen);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <section className={styles.popup}>
      <button className={styles.popup_open} onClick={handleOpenModal}>
        Открой и запомни
      </button>
      <button className={styles.popup_close} onClick={handleCloseModal}>
        Закрой и забудь
      </button>

      {isModalOpen && (
        <div className={styles.popup_container}>
          <p className={styles.popup_title}>туть пусто</p>
        </div>
      )}
    </section>
  );
};

export default Popup;
