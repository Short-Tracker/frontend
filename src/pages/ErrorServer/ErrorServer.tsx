import { error500 } from 'assets/images';
import { UniversalButton } from 'ui-lib/Buttons';
import Logo from 'components/Logo/Logo';
import styles from './ErrorServer.module.scss';

const ErrorServer = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.wrapper}>
        <img src={error500} alt='Ошибка 500' className={styles.errorImage} />
        <h2 className={styles.title}>Произошла техническая ошибка</h2>
        <div className={styles.subtitle}>
          <p>
            Попробуйте&nbsp;
            <span
              className={styles.subtitleReload}
              onClick={handleReload}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleReload();
                }
              }}
              role='button'
              tabIndex={0}
            >
              перезагрузить страницу
            </span>
          </p>
        </div>
        <UniversalButton
          className={styles.customUniversalButton}
          fontSize={12}
          isFilled={false}
        >
          Вернуться назад
        </UniversalButton>
      </div>
    </>
  );
};

export default ErrorServer;
