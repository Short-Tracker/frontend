import React, { useState } from 'react';
import { PasswordFieldButton } from 'ui-lib/Buttons';
import UniversalInput from '../UniversalInput/UniversalInput';
import styles from './PasswordInput.module.scss';

interface IPasswordInput extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  apiError?: string;
  label?: string;
  validError?: boolean;
  placeholder?: string;
  isErrorIconShow?: boolean;
  customToggleType?: () => void;
  customInputState?: { type: string; visionIcon: boolean };
}

const PasswordInput: React.FC<IPasswordInput> = ({
  validError,
  apiError,
  label,
  placeholder,
  isErrorIconShow,
  id,
  customToggleType,
  customInputState,
  ...rest
}) => {
  const [inputState, setInputState] = useState({
    type: 'password',
    visionIcon: false,
  });

  const toggleType = () => {
    if (customToggleType) {
      customToggleType();
      return;
    }

    if (inputState.type === 'password') {
      setInputState({ type: 'text', visionIcon: true });
    } else {
      setInputState({ type: 'password', visionIcon: false });
    }
  };

  return (
    <div className={styles.PasswordInputContainer}>
      <UniversalInput
        id={id}
        type={customInputState ? customInputState.type : inputState.type}
        placeholder={placeholder}
        label={label}
        pos='relative'
        {...rest}
        icon={
          <PasswordFieldButton
            isVision={
              customInputState ? customInputState.visionIcon : inputState.visionIcon
            }
            onClick={toggleType}
          />
        }
      />
    </div>
  );
};

PasswordInput.defaultProps = {
  apiError: '',
  label: 'Пароль',
  validError: false,
  placeholder: 'Введите пароль...',
  isErrorIconShow: true,
  customToggleType: undefined,
  customInputState: undefined,
};

export default PasswordInput;
