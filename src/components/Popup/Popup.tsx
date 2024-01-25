import { FC, PropsWithChildren } from 'react';
import PopupWrapper, { PopupWrapperProps } from './PopupWrapper/PopupWrapper';
import styles from './Popup.module.scss';

interface IPopupProps extends PopupWrapperProps {
  width?: string;
  height?: string;
}
const Popup: FC<IPopupProps> = ({ width, height, isOpen, onClose, children }) => (
  <PopupWrapper isOpen={isOpen} onClose={onClose}>
    <div className={styles.popup} style={{ maxWidth: width, height }}>
      {children}
    </div>
  </PopupWrapper>
);

Popup.defaultProps = {
  width: '560px',
  height: 'min-content',
};

export default Popup;
