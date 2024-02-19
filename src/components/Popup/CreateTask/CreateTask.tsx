import React, { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../../services/hooks';
import { closeModal } from '../../../store';
import createTaskThunk from '../../../thunks/create-task-thunk';
import { UniversalButton } from '../../../ui-lib/Buttons';
import CheckBox from '../../../ui-lib/CheckBoxes/CheckBox/CheckBox';
import UniversalTextarea from '../../../ui-lib/Inputs/Textarea/UniversalTextarea';
import UniversalInput from '../../../ui-lib/Inputs/UniversalInput/UniversalInput';
import Calendar from '../../Calendar/Calendar';
import styles from './CreateTask.module.scss';

type CheckboxValues = Record<string, boolean>;
const CreateTask = () => {
  const dispatch = useDispatch();
  const closeModalState = () => {
    dispatch(closeModal());
  };
  const user = useSelector((state) => state.user);
  const currentUsers = useSelector((state) => state.users);
  const users = currentUsers.results;
  const [showCheckboxesMenu, setShowCheckboxesMenu] = useState<boolean>(true);
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({});
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [dateDropdownOpen, setDateDropdownOpen] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string>('');
  const [performersId, setPerformersId] = useState<number[]>([]);

  const createTaskState = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      createTaskThunk({
        description: textareaValue,
        deadline_date: dateValue,
        performers: performersId,
      })
    );
    dispatch(closeModal());
  };
  const showCheckboxes = () => {
    setShowCheckboxesMenu(!showCheckboxesMenu);
  };
  const handleDateButtonClick = () => {
    setDateDropdownOpen(!dateDropdownOpen);
  };
  const onChangeDateValue = (event: BaseSyntheticEvent) => {
    setDateValue(event.target.value);
  };
  const onDatePick = (formattedValue: string): void => {
    setDateValue(formattedValue);
    handleDateButtonClick();
  };
  const encodeTo = (word: string) => {
    return decodeURI(word);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, id } = target;
    setCheckboxValues({ ...checkboxValues, [name]: target.checked });
    if (target.checked && target.name !== 'всем') {
      setPerformersId([...performersId, parseInt(id, 10)]);
    } else {
      setPerformersId(performersId.filter((item) => item !== parseInt(id, 10)));
    }
    if (target.name === 'всем') {
      // eslint-disable-next-line array-callback-return
      currentUsers.results.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setCheckboxValues((checkboxValues) => ({
          ...checkboxValues,
          [item.first_name]: true,
        }));
      });
      const usersIdWithoutAll = currentUsers.results.slice(1);
      // eslint-disable-next-line array-callback-return
      usersIdWithoutAll.map((userId) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setPerformersId((performersId) => [...performersId, userId.id]);
      });
    }
    if (target.name === 'всем' && !target.checked) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in checkboxValues) {
        if (checkboxValues[key]) {
          delete checkboxValues[key];
          setCheckboxValues({ ...checkboxValues });
        }
      }
      setPerformersId([]);
    }
  };
  const cleanData = () => {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in checkboxValues) {
      if (!checkboxValues[key]) {
        delete checkboxValues[key];
        setCheckboxValues({ ...checkboxValues });
      }
    }
  };
  useEffect(() => {
    cleanData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxValues]);

  return (
    <form className={styles.form} onSubmit={createTaskState}>
      <div className={styles.checkboxes}>
        <p className={styles.form__label}>выберите сотрудника</p>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={styles.checkboxes__button} onClick={showCheckboxes}>
          <div
            className={`${styles.checkboxes__select} ${
              !showCheckboxesMenu && styles.checkboxes__borders
            }`}
          >
            {Object.keys(checkboxValues).map((item) => (
              <p className={styles.name__title} key={uuidv4()}>
                {item},
              </p>
            ))}
          </div>
        </div>
        <div
          className={`${styles.checkboxes__container} ${
            !showCheckboxesMenu && styles.checkboxes__show
          }`}
          id='checkboxes'
        >
          <div className={styles.checkboxes__mesh}>
            <div className={styles.checkboxes__label} key={uuidv4()}>
              <CheckBox
                id={user.id}
                name={user.first_name}
                checked={checkboxValues[user.first_name] || false}
                onChange={handleChange}
              />
              <p className={styles.name__title}>Себе</p>
            </div>
            <div className={styles.checkboxes__label} key={uuidv4()}>
              <CheckBox
                id='-1'
                name='всем'
                checked={checkboxValues[encodeTo('всем')] || false}
                onChange={handleChange}
              />
              <p className={styles.name__title}>Всем</p>
            </div>
            {users.map((item) => (
              <div className={styles.checkboxes__label} key={uuidv4()}>
                <CheckBox
                  id={item.id}
                  name={item.first_name}
                  checked={checkboxValues[item.first_name] || false}
                  onChange={handleChange}
                />
                <p className={styles.name__title}>
                  {item.first_name}&ensp;
                  {item.last_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.textarea__container}>
        <UniversalTextarea
          label='Содержание задачи'
          value={textareaValue}
          onChange={setTextareaValue}
        />
      </div>
      <div className={styles.datetime}>
        <div className={styles.calendar}>
          <p className={styles.calendar__title}>Дедлайн (по МСК)</p>
          <div className={styles.calendar__input}>
            <input
              onFocus={handleDateButtonClick}
              className={styles.calendar__button}
              onChange={onChangeDateValue}
              value={dateValue}
            />
            {dateDropdownOpen && (
              <div className={styles.calendar}>
                <div className={styles.calendar__open}>
                  <Calendar
                    handleSubmit={onDatePick}
                    handleClose={handleDateButtonClick}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.timeContainer}>
          <p className={styles.calendar__title}>Время (по МСК)</p>
          <input className={styles.time} placeholder='--/--' disabled />
        </div>
      </div>
      <div className={styles.linkInput}>
        <UniversalInput id='task' label='Ссылка (необязательное поле)' />
      </div>
      <div className={styles.button}>
        <UniversalButton
          width='250px'
          height='40px'
          type='submit'
          className={styles.button__button}
          disabled={!checkboxValues || !textareaValue || !dateValue}
        >
          Создать
        </UniversalButton>
        <UniversalButton
          width='250px'
          height='40px'
          onClick={closeModalState}
          isFilled={false}
          className={styles.button__button}
        >
          Отменить
        </UniversalButton>
      </div>
    </form>
  );
};
export default CreateTask;
