import React, { FocusEvent, FC, ReactComponentElement } from 'react';
import styles from './UniversalInput.module.scss';

interface IUniversalInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactComponentElement<FC> | null;
  id: string;
  pos?: any;
  customStyle?: string;
  error?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const UniversalInput: FC<IUniversalInput> = ({
  label,
  id,
  type = 'text',
  placeholder,
  icon = null,
  pos,
  customStyle,
  error,
  onBlur,
  ...rest
}) => {
  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    if (onBlur) {
      onBlur(event);
    }
    event.target.value = trimmedValue;
  };
  return (
    <div className={styles.Container} style={{ position: pos }}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={id}
          className={`${error ? styles.input_error : ''} ${styles.input}`}
          placeholder={placeholder}
          type={type}
          onBlur={handleInputBlur}
          {...rest}
        />
        {icon && icon}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

UniversalInput.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  icon: null,
  pos: '',
  customStyle: '',
  error: '',
  onBlur: undefined,
};
export default UniversalInput;
