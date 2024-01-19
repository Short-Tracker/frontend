import React, { FC, ReactComponentElement } from 'react';
import styles from './UniversalInput.module.scss';

interface IUniversalInput extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactComponentElement<FC> | null;
  id: string;
  pos?: any;
  customStyle?: string;
}

const UniversalInput: FC<IUniversalInput> = ({
  label,
  id,
  type = 'text',
  placeholder,
  icon = null,
  pos,
  customStyle,
  ...rest
}) => (
  <div className={styles.Container} style={{ position: pos }}>
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
    <div className={styles.inputContainer}>
      <input
        id={id}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
      {icon && icon}
    </div>
  </div>
);

UniversalInput.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  icon: null,
  pos: 'static',
  customStyle: '',
};
export default UniversalInput;
