import React from 'react';

// Определение типов пропсов
interface TimelineProps {
  date: Date;
}

const Timeline: React.FC<TimelineProps> = ({ date }) => {
  return (
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-date">{date.toDateString()}</div>
      </div>
    </div>
  );
};

export default Timeline;
