import React, { SyntheticEvent } from 'react';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import { NavLink, useNavigate } from 'react-router-dom';
import { UniversalButton } from 'ui-lib/Buttons';
import styles from './AuthorizationForm.module.scss';

const AuthorizationForm = () => {
  const navigate = useNavigate();
  const onSubmitLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    navigate('/main');
  };

  return (
    <form className={styles.AuthorizationForm} onSubmit={onSubmitLogin}>
      <div className={styles.AuthorizationForm__container}>
        <EmailInput id="email" />
        <PasswordInput id="password" />
      </div>
      <NavLink to="pass" className={styles.AuthorizationForm__question}>
        Забыли пароль?
      </NavLink>
      <div className={styles.AuthorizationForm__marginAfterButton}>
        <UniversalButton>Войти</UniversalButton>
      </div>
    </form>
  );
};
export default AuthorizationForm;
