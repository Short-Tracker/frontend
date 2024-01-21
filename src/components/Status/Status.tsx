import StatusElement from './StatusElement/StatusElement';
import styles from './Status.module.scss';

interface StatusProps {
  className: string;
  text: string;
  id: number;
}

const Status = () => {
  const elements = [
    { id: 1, text: 'Todo', className: 'todo' },
    { id: 2, text: 'In progress', className: 'inProgress' },
    { id: 3, text: 'Done', className: 'done' },
    { id: 4, text: 'Hold', className: 'hold' },
  ];
  return (
    <section className={styles.container}>
      {elements.map((el: StatusProps) => {
        return <StatusElement key={el.id} {...el} />;
      })}
    </section>
  );
};

export default Status;
