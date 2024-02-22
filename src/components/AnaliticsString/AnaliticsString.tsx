import React from 'react';
import styles from './AnaliticsString.module.scss';

export interface AnaliticsStringProps {
  performer: string;
  index: number;
  activeContainer?: string;
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
  activeContainer,
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
              activeContainer === 'inTime'
                ? styles.analitics_rating_filter_container_active
                : undefined
            }`}
          >
            <span>{inTime}</span>
          </div>
          <div
            className={`${styles.done_container} ${
              activeContainer === 'afterDeadline'
                ? styles.analitics_rating_filter_container_active
                : undefined
            }`}
          >
            <span>{afterDeadline}</span>
          </div>
          <div
            className={`${styles.done_container} ${
              activeContainer === 'allDone'
                ? styles.analitics_rating_filter_container_active
                : undefined
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
  activeContainer: 'inTime',
};
