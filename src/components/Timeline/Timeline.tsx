import React from 'react';
import styles from './Timeline.module.scss';

// Определение типов пропсов
interface TimelineProps {
  date: Date;
}

const Timeline: React.FC<TimelineProps> = ({ date }) => {
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineDate}>{formattedDate.replace(' г.', '')}</div>
      <hr className={styles.timelineSeparator} />
    </div>
  );
};

export default Timeline;
