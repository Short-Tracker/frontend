import React from 'react';
import UniversalInput from '../UniversalInput/UniversalInput';

interface IEmailInput extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  label?: string;
}

const EmailInput: React.FC<IEmailInput> = ({ label, id, ...rest }) => (
  <UniversalInput
    id={id}
    type='email'
    placeholder='Введите Email...'
    label={label}
    customStyle='input__customStyle'
    {...rest}
  />
);
EmailInput.defaultProps = {
  label: 'Логин',
};

export default EmailInput;
