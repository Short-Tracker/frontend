import React, { FC } from 'react';
import styles from './CheckBox.module.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number | any;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, id, ...rest }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={styles.checkbox__label}>
    <input
      id={id}
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className={styles.checkbox}
      {...rest}
    />

    <span className={styles.checkbox__visible} />
  </label>
);
export default Checkbox;
