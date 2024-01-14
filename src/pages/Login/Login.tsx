import React from 'react';
import Logo from 'components/Logo/Logo';
import AuthorizationForm from 'components/Forms/AuthorizationForm/AuthorizationForm';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <main className={styles.Login}>
      <div className={styles.Login__logo}>
        <Logo />
      </div>
      <h1 className={styles.Login__title}>Добро пожаловать в Шорт-трекер</h1>
      <AuthorizationForm />
    </main>
  );
};
export default Login;
