import { useState } from 'react';
import UniversalInput from 'ui-lib/Inputs/UniversalInput/UniversalInput';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import { UniversalButton } from 'ui-lib/Buttons';
import styles from './NewEmployee.module.scss';
import additionalStyles from '../../ui-lib/Inputs/UniversalInput/UniversalInput.module.scss';

const NewEmployee = () => {
  const name = '';
  const lastName = '';
  const email = '';
  const nickname = '';
  const password = '';
  const errorText = '';
  const [isValid, setIslValid] = useState(false);
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
        <UniversalInput
          className={`${additionalStyles.input} ${isValid ? styles.invalidInput : ''}`}
          id={nickname}
          label='Telegram'
          placeholder='@BorKate'
        />
        {isValid && <p className={styles.errorText}>{errorText}</p>}
        <EmailInput
          className={`${additionalStyles.input} ${isValid ? styles.invalidInput : ''}`}
          id={email}
        />
        {isValid && <p className={styles.errorText}>{errorText}</p>}
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
