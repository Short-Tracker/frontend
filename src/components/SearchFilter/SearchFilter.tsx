import React, { BaseSyntheticEvent, useState } from 'react';
import styles from './SearchFilter.module.scss';
import { UniversalButton } from '../../ui-lib/Buttons';
import UniversalTextarea from '../../ui-lib/Inputs/Textarea/UniversalTextarea';
import Calendar from '../Calendar/Calendar';
import { CalendarIcon } from '../../ui-lib/Icons';

const SearchFilter = () => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string>('');
  const [idValue, setIdValue] = useState<string>('');

  const onIdChange = (value: string) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setIdValue(value);
    }
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

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formsarea}>
          <div className={styles.textarea}>
            <UniversalTextarea
              label=''
              onChange={onIdChange}
              value={idValue}
              placeholder='ID задачи'
              textareaStyles={{
                marginTop: 0,
                padding: 0,
                paddingLeft: 12,
                paddingTop: 3,
              }}
            />
          </div>
          <label
            htmlFor='checkbox-SerachFilter-1'
            className={styles.outdate_checkbox_container}
          >
            <input
              id='checkbox-SerachFilter-1'
              type='checkbox'
              className={styles.outdate_checkbox}
            />
            <p className={styles.outdate_checkbox_label}>Только просроченные</p>
          </label>
          <div>
            <div className={styles.calendar_input}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div onClick={handleDateButtonClick}>
                <CalendarIcon />
              </div>
              <input
                onFocus={handleDateButtonClick}
                className={styles.calendar_input__inputarea}
                onChange={onChangeDateValue}
                value={dateValue}
                placeholder='Дата задачи'
              />
            </div>
            {dateDropdownOpen && (
              <div className={styles.calendar}>
                <div className={styles.calendar__open}>
                  <Calendar
                    handleSubmit={onDatePick}
                    handleClose={handleDateButtonClick}
                    selectRange
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.button__container}>
          <UniversalButton type='button' className={styles.submit_button}>
            <p className={styles.submit_button_text}>Применить</p>
          </UniversalButton>
          <UniversalButton type='button' className={styles.reset_button} isFilled={false}>
            <p className={styles.reset_button_text}>Сбросить</p>
          </UniversalButton>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
