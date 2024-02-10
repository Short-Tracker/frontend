import React from 'react';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import loginUserThunk from 'thunks/login-user-thunk';
import { NavLink } from 'react-router-dom';
import { UniversalButton } from 'ui-lib/Buttons';
import { FormValues, useForm } from 'utils/useForm';
import { useDispatch } from '../../../services/hooks';
import styles from './AuthorizationForm.module.scss';

const AuthorizationForm = () => {
  const dispatch = useDispatch();

  const onSubmitLogin = (values: FormValues) => {
    dispatch(
      loginUserThunk({ email: values.email || '', password: values.password || '' })
    );
  };

  const { errors, handleBlur, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: onSubmitLogin,
  });
  return (
    <form className={styles.AuthorizationForm} onSubmit={handleSubmit}>
      <div className={styles.AuthorizationForm__container}>
        <EmailInput id='email' name='email' onBlur={handleBlur} error={errors.email} />
        <PasswordInput
          id='password'
          name='password'
          onBlur={handleBlur}
          error={errors.password}
        />
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
