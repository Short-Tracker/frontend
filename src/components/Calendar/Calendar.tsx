/* eslint-disable @typescript-eslint/no-shadow */
import './Calendar.scss';
import React, { FC, useState } from 'react';
import { CalendarProps, Calendar as ReactСalendar } from 'react-calendar';
import { UniversalButton } from 'ui-lib/Buttons';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TCalendarValue } from 'types/Calendar';
import styles from './Calendar.module.scss';

type TProps = {
  //   onChange: (date: Date) => void;
  //   value: TCalendarValue;
  handleSubmit: (formattedValue: string) => void;
  handleClose: () => void;
} & CalendarProps;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: FC<TProps> = (props) => {
  // const { onChange, value, handleSubmit, handleClose } = props;
  const { handleSubmit, handleClose } = props;
  const [value, onChange] = useState<Value>(new Date());

  const formattedValue =
    value && !Array.isArray(value) ? format(value, 'yyyy-MM-dd', { locale: ru }) : '';

  return (
    <section className={styles.section}>
      <ReactСalendar {...props} onChange={onChange} value={value} locale={ru.code} />
      <div className={styles.buttonWrapper}>
        <UniversalButton
          type='submit'
          onClick={() => handleSubmit(formattedValue)}
          fontSize={12}
          width={248}
          isFilled
        >
          Сохранить
        </UniversalButton>
        <UniversalButton
          onClick={handleClose}
          type='button'
          fontSize={12}
          width={248}
          isFilled={false}
        >
          Отменить
        </UniversalButton>
      </div>
    </section>
  );
};

export default Calendar;
