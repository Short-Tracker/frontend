import React from 'react';
import UniversalInput from 'ui-lib/Inputs/UniversalInput/UniversalInput';
import EmailInput from 'ui-lib/Inputs/EmailInput/EmailInput';
import PasswordInput from 'ui-lib/Inputs/PasswordInput/PasswordInput';
import { UniversalButton } from 'ui-lib/Buttons';
import { FormValues, useForm } from 'utils/useForm';
import { useDispatch } from 'services/hooks';
import Popup from '../Popup';
import styles from './NewEmployee.module.scss';
import createUserThunk from '../../../thunks/create-user-thunk';

const NewEmployeePopup: React.FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const dispatch = useDispatch();

  const onSubmitAddUser = (values: FormValues) => {
    dispatch(
      createUserThunk({
        email: values.email,
        telegram_nickname: values.nickname,
        password: values.password,
        first_name: values.name,
        last_name: values.lastName,
      })
    );
  };

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '', nickname: '', name: '', lastName: '' },
    onSubmit: onSubmitAddUser,
  });

  const handleCancel = () => {
    closePopup();
  };

  return (
    <Popup isOpen onClose={closePopup}>
      <form className={styles.newEmployee} onSubmit={handleSubmit}>
        <div className={styles.newEmployeeContainer}>
          <div className={styles.newEmployeeWrapper}>
            <UniversalInput
              id='name'
              name='name'
              label='Имя'
              placeholder='Иван'
              width={246.5}
              error={errors.name}
              onChange={handleChange}
            />
            <UniversalInput
              id='lastName'
              name='lastName'
              label='Фамилия'
              placeholder='Иванов'
              width={246.5}
              error={errors.lastName}
              onChange={handleChange}
            />
          </div>
          <UniversalInput
            id='nickname'
            name='nickname'
            label='Telegram'
            placeholder='@BorKate'
            error={errors.nickname}
            onChange={handleChange}
          />
          <EmailInput
            id='email'
            name='email'
            error={errors.email}
            onChange={handleChange}
          />
          <PasswordInput
            id='password'
            name='password'
            error={errors.password}
            onChange={handleChange}
          />
          <div className={styles.newEmployeeWrapper}>
            <UniversalButton className={styles.newEmployeeAddButton} width={246.5}>
              Добавить сотрудника
            </UniversalButton>
            <UniversalButton
              className={styles.newEmployeeButton}
              isFilled={false}
              width={246.5}
              onClick={handleCancel}
            >
              Отменить
            </UniversalButton>
          </div>
        </div>
      </form>
    </Popup>
  );
};

export default NewEmployeePopup;
