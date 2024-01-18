import { error } from 'assets/images';
import { UniversalButton } from 'ui-lib/Buttons';
import Logo from 'components/Logo/Logo';
import styles from './Error.module.scss';

const Error = () => {
  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.wrapper}>
        <img src={error} alt="Ошибка" className={styles.errorImage} />
        <h2 className={styles.title}>Этой страницы не существует</h2>
        <p className={styles.subtitle}>
          Зато есть доска с задачами, которые ждут перевода в статус
        </p>
        <UniversalButton fontSize={16} isFilled={false}>
          Перейти на экран с задачами
        </UniversalButton>
      </div>
    </>
  );
};

export default Error;
