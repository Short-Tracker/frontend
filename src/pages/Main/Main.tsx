import React from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import Tasks from '../Tasks/Tasks';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles.main}>
      <h1>главная страница</h1>
      <UniversalButton>Кнопка</UniversalButton>
      <Tasks />
      <Search />
      <EmailInput id="email" label="Логин" />
      <PasswordInput id="password" />
    </main>
  );
};

export default Main;
