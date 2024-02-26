import React from 'react';
import UniversalInput from '../UniversalInput/UniversalInput';

interface IEmailInput extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  label?: string;
  error?: string;
}

const EmailInput: React.FC<IEmailInput> = ({ label, id, error, ...rest }) => (
  <UniversalInput
    id={id}
    type='email'
    placeholder='Введите Email...'
    label={label}
    customStyle='input__customStyle'
    error={error}
    {...rest}
  />
);
EmailInput.defaultProps = {
  label: 'Логин',
  error: '',
};

export default EmailInput;
