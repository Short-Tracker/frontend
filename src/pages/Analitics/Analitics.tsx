import React from 'react';
import { useDispatch } from 'services/hooks';
import SideBar from 'components/SideBar/SideBar';
import { openCreateTaskModal } from 'store';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import { AnaliticsString } from 'components/AnaliticsString/AnaliticsString';
import styles from './Analitics.module.scss';

const Analitics = () => {
  const dispatch = useDispatch();
  const [activeInTime, setActiveInTime] = React.useState(true);
  const [activeAfterDeadline, setActiveAfterDeadline] = React.useState(false);
  const [activeAllDone, setActiveAllDone] = React.useState(false);
  const [activeContainer, setActiveContainer] = React.useState('inTime');

  const openCreateTask = () => {
    dispatch(openCreateTaskModal());
  };

  const rateInTime = () => {
    setActiveInTime(true);
    setActiveAfterDeadline(false);
    setActiveAllDone(false);
    setActiveContainer('inTime');
  };

  const rateAfterDeadline = () => {
    setActiveInTime(false);
    setActiveAfterDeadline(true);
    setActiveAllDone(false);
    setActiveContainer('afterDeadline');
  };

  const rateAllDone = () => {
    setActiveInTime(false);
    setActiveAfterDeadline(false);
    setActiveAllDone(true);
    setActiveContainer('allDone');
  };

  const data = [
    {
      performer: 'Мария Жигунова',
      inTime: 10,
      afterDeadline: 3,
      all: 13,
    },
    {
      performer: 'Юлия Александрова',
      inTime: 13,
      afterDeadline: 4,
      all: 17,
    },
    {
      performer: 'Мария Жигунова',
      inTime: 25,
      afterDeadline: 3,
      all: 28,
    },
    {
      performer: 'Юлия Александрова',
      inTime: 5,
      afterDeadline: 15,
      all: 20,
    },
  ];

  return (
    <div className={styles.page_container}>
      <SideBar />
      <div className={styles.page_analitics}>
        <div className={styles.page_serchContainer}>
          <Search />
          <UniversalButton onClick={openCreateTask} width='244'>
            <p>Создать задачу</p>
          </UniversalButton>
        </div>
        <div className={styles.analitics}>
          <div className={styles.analitics_general}>
            <h2 className={styles.analitics_header}>
              Общая продуктивность команды по решенным задачам
            </h2>
            <div className={styles.analitics_general_done}>
              <div className={styles.analitics_general_done_intime}>
                <span className={styles.analitics_general_done_number}>150</span>
                <span className={styles.analitics_general_done_text}>решено в срок</span>
              </div>
              <div className={styles.analitics_general_done_after}>
                <span
                  className={`${styles.analitics_general_done_number} ${styles.analitics_general_done_number_grey}`}
                >
                  36
                </span>
                <span className={styles.analitics_general_done_text}>
                  решено после дедлайна
                </span>
              </div>
            </div>
          </div>
          <div className={styles.analitics_rating}>
            <h2 className={styles.analitics_header}>Рейтинг по решенным задачам</h2>
            <ul className={styles.analitics_rating_filter}>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeInTime
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateInTime}>В срок</button>
              </li>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeAfterDeadline
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateAfterDeadline}>После дедлайна</button>
              </li>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeAllDone
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateAllDone}>Общее количество</button>
              </li>
            </ul>
            <div className={styles.analitics_performers}>
              {data.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                  <AnaliticsString
                    performer={item.performer}
                    index={index}
                    inTime={item.inTime}
                    afterDeadline={item.afterDeadline}
                    all={item.all}
                    activeContainer={activeContainer}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.analitics_speed}>
            <h2 className={styles.analitics_header}>Скорость взятия задачи</h2>
            <div className={styles.analitics_speed_filter}>
              <p>Все решенные</p>
            </div>
            <div className={styles.analitics_performers}>
              <AnaliticsString performer='Мария Жигунова' index={0} time='30 мин' />
              <AnaliticsString performer='Юлия Александрова' index={1} time='50 мин' />
              <AnaliticsString performer='Мария Жигунова' index={2} time='1 ч 20 мин' />
              <AnaliticsString performer='Юлия Александрова' index={3} time='40 мин' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analitics;
