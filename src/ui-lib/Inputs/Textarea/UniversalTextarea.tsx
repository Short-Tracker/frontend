import React, { ChangeEvent, FC, useState } from 'react';
import styles from './UniversalTextarea.module.scss';

interface IUniversalTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const UniversalTextarea: FC<IUniversalTextareaProps> = ({ label, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const controlId = `textarea-${label.replace(/\s+/g, '').toLowerCase()}`;

  return (
    <div className={styles.textarea}>
      <label className={styles.textarea__title} htmlFor={controlId}>
        {label}
      </label>
      <textarea
        id={controlId}
        className={styles.textarea__content}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default UniversalTextarea;
