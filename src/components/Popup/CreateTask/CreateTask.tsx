import { BaseSyntheticEvent, SyntheticEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateTask.module.scss';
import CheckBox from '../../../ui-lib/CheckBoxes/CheckBox/CheckBox';
import UniversalTextarea from '../../../ui-lib/Inputs/Textarea/UniversalTextarea';
import Calendar from '../../Calendar/Calendar';
import UniversalInput from '../../../ui-lib/Inputs/UniversalInput/UniversalInput';
import { UniversalButton } from '../../../ui-lib/Buttons';
import { useDispatch, useSelector } from '../../../services/hooks';
import { closeModal } from '../../../store';
import createTaskThunk from '../../../thunks/create-task-thunk';

type CheckboxValues = Record<string, boolean>;
const CreateTask = () => {
  const dispatch = useDispatch();
  const closeModalState = () => {
    dispatch(closeModal());
  };
  const currentUsers = useSelector((state) => state.users);
  const users = currentUsers.results;
  const [showCheckboxesMenu, setShowCheckboxesMenu] = useState<boolean>(true);
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({});
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [dateDropdownOpen, setDateDropdownOpen] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string>('');

  const createTaskState = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      createTaskThunk({
        description: textareaValue,
        deadline_date: dateValue,
        performers: [2],
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    setCheckboxValues({ ...checkboxValues, [name]: target.checked });
  };
  return (
    <form className={styles.form} onSubmit={createTaskState}>
      <div className={styles.checkboxes}>
        <p className={styles.form__label}>выберите сотрудника</p>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={styles.checkboxes__button} onClick={() => showCheckboxes()}>
          <div
            className={`${styles.checkboxes__select} ${
              !showCheckboxesMenu && styles.checkboxes__borders
            }`}
          >
            <p className={styles.calendar__title}>Выберите сотрудника</p>
          </div>
        </div>
        <div
          className={`${styles.checkboxes__container} ${
            !showCheckboxesMenu && styles.checkboxes__show
          }`}
          id="checkboxes"
        >
          <div className={styles.checkboxes__mesh}>
            {users.map((item, index) => (
              <div className={styles.checkboxes__label} key={uuidv4()}>
                <CheckBox
                  name={item.first_name}
                  checked={checkboxValues[item.first_name] || false}
                  onChange={handleChange}
                />
                <p className={styles.checkboxes__text}>{item.first_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.textarea__container}>
        <UniversalTextarea
          label="Содержание задачи"
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
          <p className={styles.form__label}>Время (по МСК)</p>
          <input className={styles.time} placeholder="--/--" />
        </div>
      </div>
      <div className={styles.linkInput}>
        <UniversalInput id="task" label="Ссылка (необязательное поле)" />
      </div>
      <div className={styles.button}>
        <UniversalButton
          width="250px"
          height="40px"
          type="submit"
          className={styles.button__button}
          disabled={!checkboxValues || !textareaValue || !dateValue}
        >
          Создать
        </UniversalButton>
        <UniversalButton
          width="250px"
          height="40px"
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
