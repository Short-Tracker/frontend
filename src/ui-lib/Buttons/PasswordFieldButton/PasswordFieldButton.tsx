import React, { FC, ComponentPropsWithoutRef } from 'react';
import { EyeIcon, EyeClosedIcon } from 'ui-lib/Icons';
import styles from './PasswordFieldButton.module.scss';

interface IPasswordFieldButton extends ComponentPropsWithoutRef<'button'> {
  isVision?: boolean;
  onClick?: () => void;
  error?: boolean;
}

const PasswordFieldButton: FC<IPasswordFieldButton> = ({ isVision, onClick, error }) => {
  return (
    <button type='button' onClick={onClick} className={styles.PasswordFieldButton}>
      {isVision ? <EyeIcon /> : <EyeClosedIcon />}
    </button>
  );
};
PasswordFieldButton.defaultProps = {
  isVision: true,
  onClick: () => {},
  error: false,
};

export default PasswordFieldButton;
