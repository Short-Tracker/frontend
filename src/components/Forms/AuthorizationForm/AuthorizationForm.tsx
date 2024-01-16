import React, { SyntheticEvent, useState } from 'react';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import loginUserThunk from 'thunks/login-user-thunk';
import { NavLink, useNavigate } from 'react-router-dom';
import { UniversalButton } from 'ui-lib/Buttons';
import { useDispatch } from '../../../services/hooks';
import styles from './AuthorizationForm.module.scss';

const AuthorizationForm = () => {
  type Values = Record<string, string>;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState<Values>({});
  const onSubmitLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(loginUserThunk({ email: values.email, password: values.password }));
    navigate('/main');
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  return (
    <form className={styles.AuthorizationForm} onSubmit={onSubmitLogin}>
      <div className={styles.AuthorizationForm__container}>
        <EmailInput id="email" name="email" onChange={handleChange} />
        <PasswordInput id="password" name="password" onChange={handleChange} />
      </div>
      <NavLink to="pass" className={styles.AuthorizationForm__question}>
        Забыли пароль?
      </NavLink>
      <div className={styles.AuthorizationForm__marginAfterButton}>
        <UniversalButton type="submit">Войти</UniversalButton>
      </div>
    </form>
  );
};
export default AuthorizationForm;
