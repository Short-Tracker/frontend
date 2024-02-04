import React, { SyntheticEvent, useState } from 'react';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import loginUserThunk from 'thunks/login-user-thunk';
import { NavLink } from 'react-router-dom';
import { UniversalButton } from 'ui-lib/Buttons';
import { validateField } from 'utils/validateFields';
import { useDispatch } from '../../../services/hooks';
import styles from './AuthorizationForm.module.scss';

const AuthorizationForm = () => {
  type Values = Record<string, string>;
  type FormErrors = Record<string, string>;
  const dispatch = useDispatch();
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const onSubmitLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    const newErrors: FormErrors = {};
    Object.entries(values).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(loginUserThunk({ email: values.email, password: values.password }));
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <form className={styles.AuthorizationForm} onSubmit={onSubmitLogin}>
      <div className={styles.AuthorizationForm__container}>
        <EmailInput id='email' name='email' onChange={handleChange} />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
        <PasswordInput id='password' name='password' onChange={handleChange} />
        {errors.password && <div className={styles.error}>{errors.password}</div>}
      </div>
      <NavLink to='pass' className={styles.AuthorizationForm__question}>
        Забыли пароль?
      </NavLink>
      <div className={styles.AuthorizationForm__marginAfterButton}>
        <UniversalButton type='submit'>Войти</UniversalButton>
      </div>
    </form>
  );
};
export default AuthorizationForm;
