import { BaseSyntheticEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import UniversalInput from 'ui-lib/Inputs/UniversalInput/UniversalInput';
import Calendar from 'components/Calendar/Calendar';
import { UniversalButton } from 'ui-lib/Buttons';
import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UniversalTextarea from 'ui-lib/Inputs/Textarea/UniversalTextarea';
import styles from './CreateTaskPopup.module.scss';
import Popup from '../Popup';

interface ICreateTaskPopupProps {
  onClose: () => void;
}

const CreateTaskPopup: FC<ICreateTaskPopupProps> = ({ onClose }) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [dateValue, setDateValue] = useState<string>('');
  const [timeValue, setTimeValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleDateButtonClick = () => {
    setDateDropdownOpen(!dateDropdownOpen);
  };

  const handleCancel = () => {
    setDateValue('');
    setTimeValue('');
    setSelectedOption('');
    setTextareaValue('');
    setDateDropdownOpen(false);
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      timeValue: '',
    },
    validationSchema: yup.object({
      timeValue: yup
        .string()
        .required('Введите время в формате чч:мм')
        .matches(/^\d{2}:\d{2}$/, 'Некорректный формат времени'),
    }),
    onSubmit: () => {
      setTimeValue(formik.values.timeValue);
    },
  });
  useEffect(() => {
    setTimeValue(formik.values.timeValue);
  }, [formik.values.timeValue]);

  const onChangeDateValue = (event: BaseSyntheticEvent) => {
    setDateValue(event.target.value);
  };
  const onDatePick = (formattedValue: string): void => {
    setDateValue(formattedValue);
  };
  return (
    <Popup isOpen onClose={onClose}>
      <div className={styles.select}>
        <div className={styles.select__container}>
          <p className={styles.select__title}>Выберите сотрудника</p>
          <select
            className={styles.select__options}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option className={styles.select__option} value="option" />
            <option className={styles.select__option} value="option1">
              Ваня
            </option>
            <option className={styles.select__option} value="option2">
              Петя
            </option>
            <option className={styles.select__option} value="option3">
              Зина
            </option>
            <option className={styles.select__option} value="option4">
              Олег
            </option>
            <option className={styles.select__option} value="option5">
              Люба
            </option>
          </select>
        </div>
      </div>

      <div className={styles.textarea}>
        <UniversalTextarea
          label="Содержание задачи"
          value={textareaValue}
          onChange={setTextareaValue}
        />
      </div>

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
                <Calendar handleSubmit={onDatePick} />
              </div>
            </div>
          )}

          <InputMask
            type="text"
            id="timeValue"
            name="timeValue"
            mask="99:99"
            maskChar=""
            value={formik.values.timeValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="--:--"
            className={styles.calendar__textButtonInput}
          />
          {formik.touched.timeValue && formik.errors.timeValue && (
            <div className={styles.error}>{formik.errors.timeValue}</div>
          )}
        </div>
      </div>

      <div className={styles.linkInput}>
        <UniversalInput id="task" label="Ссылка (необязательное поле)" />
      </div>

      <div className={styles.button}>
        <UniversalButton
          width="248px"
          height="40px"
          /* onClick={} */
          className={styles.button__button}
          disabled={!selectedOption || !textareaValue || !dateValue}
        >
          Создать
        </UniversalButton>
        <UniversalButton
          width="248px"
          height="40px"
          onClick={handleCancel}
          isFilled={false}
          className={styles.button__button}
        >
          Отменить
        </UniversalButton>
      </div>
    </Popup>
  );
};

export default CreateTaskPopup;
