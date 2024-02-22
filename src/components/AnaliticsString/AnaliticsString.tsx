import React from 'react';
import styles from './AnaliticsString.module.scss';

export interface AnaliticsStringProps {
  performer: string;
  index: number;
  activeColumn?: string;
  time?: string;
  inTime?: number;
  afterDeadline?: number;
  all?: number;
}

export const AnaliticsString: React.FC<AnaliticsStringProps> = ({
  performer,
  time,
  inTime,
  afterDeadline,
  all,
  index,
  activeColumn,
}) => {
  return (
    <div
      className={`${styles.container} ${
        index % 2 === 0 ? styles.container_grey : undefined
      }`}
    >
      <p>{performer}</p>
      {time ? (
        <span className={styles.time}>{time}</span>
      ) : (
        <div className={styles.done}>
          <div
            className={`${styles.done_container} ${styles.done_container_green} ${
              activeColumn === 'inTime' ? styles.done_container_active : undefined
            }`}
          >
            <span>{inTime}</span>
          </div>
          <div
            className={`${styles.done_container} ${styles.done_container_grey} ${
              activeColumn === 'afterDeadline' ? styles.done_container_active : undefined
            }`}
          >
            <span>{afterDeadline}</span>
          </div>
          <div
            className={`${styles.done_container} ${
              activeColumn === 'allDone' ? styles.done_container_active : undefined
            }`}
          >
            <span>{all}</span>
          </div>
        </div>
      )}
    </div>
  );
};

AnaliticsString.defaultProps = {
  time: '',
  inTime: 0,
  afterDeadline: 0,
  all: 0,
  activeColumn: '',
};
