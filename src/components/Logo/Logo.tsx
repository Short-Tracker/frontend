import React from 'react';
import { logo } from 'assets/images';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <img src={logo} alt='Логотип' />
    </div>
  );
};
export default Logo;
