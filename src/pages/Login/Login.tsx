import { useEffect } from 'react';
import Logo from 'components/Logo/Logo';
import AuthorizationForm from 'components/Forms/AuthorizationForm/AuthorizationForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'services/hooks';
import NewEmployee from 'components/NewEmployee/NewEmployee';
import styles from './Login.module.scss';

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.system);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('main');
    }
  }, [isLoggedIn, navigate]);
  return (
    <main className={styles.Login}>
      <div className={styles.Login__logo}>
        <Logo />
      </div>
      <h1 className={styles.Login__title}>Добро пожаловать в Шорт-трекер</h1>
      <AuthorizationForm />
      <NewEmployee />
    </main>
  );
};
export default Login;
