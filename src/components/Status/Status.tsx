import React from 'react';
import StatusElement from './StatusElement/StatusElement';
import styles from './Status.module.scss';

const Status = () => {
  const elements: string[] = ['Todo', 'In progress', 'Done', 'Hold'];
  return (
    <section className={styles.container}>
      {elements.map((item: string) => {
        return StatusElement(item);
      })}
    </section>
  );
};

export default Status;
