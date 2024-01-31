import UniversalInput from 'ui-lib/Inputs/UniversalInput/UniversalInput';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import { UniversalButton } from 'ui-lib/Buttons';
import styles from './NewEmployee.module.scss';

const NewEmployee = () => {
  const name = '';
  const lastName = '';
  const email = '';
  const nickname = '';
  const password = '';
  return (
    <form className={styles.newEmployee}>
      <div className={styles.newEmployeeContainer}>
        <div className={styles.newEmployeeWrapper}>
          <UniversalInput
            className={styles.nameEmployee}
            id={name}
            label='Имя'
            placeholder='Иван'
            width={246.5}
          />
          <UniversalInput
            className={styles.nameEmployee}
            id={lastName}
            label='Фамилия'
            placeholder='Иванов'
            width={246.5}
          />
        </div>
        <EmailInput id={email} />
        <UniversalInput id={nickname} label='Telegram' placeholder='@BorKate' />
        <PasswordInput id={password} />
        <div className={styles.newEmployeeWrapper}>
          <UniversalButton className={styles.newEmployeeAddButton} width={246.5}>
            Добавить сотрудника
          </UniversalButton>
          <UniversalButton
            className={styles.newEmployeeButton}
            isFilled={false}
            width={246.5}
          >
            Отменить
          </UniversalButton>
        </div>
      </div>
    </form>
  );
};

export default NewEmployee;
