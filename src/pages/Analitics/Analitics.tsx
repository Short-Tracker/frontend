import React from 'react';
import { useDispatch } from 'services/hooks';
import SideBar from 'components/SideBar/SideBar';
import { openCreateTaskModal } from 'store';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import { AnaliticsString } from 'components/AnaliticsString/AnaliticsString';
import { ArrowDownIcon, ArrowIcon, ArrowUpIcon } from 'ui-lib/Icons';
import styles from './Analitics.module.scss';

const Analitics = () => {
  const dispatch = useDispatch();
  const [isCollapsedLeft, setIsCollapsedLeft] = React.useState(false);
  const [isCollapsedRight, setIsCollapsedRight] = React.useState(false);
  const [activeRating, setActiveRating] = React.useState('inTime');
  const [leftFilter, setLeftFilter] = React.useState('Todo');
  const [rightFilter, setRightFilter] = React.useState('In progress');

  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  const endDate = new Date(currentDate);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);
  const formattedStartDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(startDate);
  const formattedEndDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(endDate);

  const openCreateTask = () => {
    dispatch(openCreateTaskModal());
  };

  // Обработчики клика для сворачивания/разворачивания
  const handleToggleCollapseLeft = () => {
    setIsCollapsedLeft(!isCollapsedLeft);
  };
  const handleToggleCollapseRight = () => {
    setIsCollapsedRight(!isCollapsedRight);
  };

  // изменение фильтров
  const changeLeftFilter = () => {
    if (leftFilter === 'Todo') {
      setLeftFilter('In progress');
      if (rightFilter === 'In progress') {
        setRightFilter('Done');
      }
    } else {
      setLeftFilter('Todo');
    }
    setIsCollapsedLeft(!isCollapsedLeft);
  };

  const changeRightFilter = () => {
    if (rightFilter === 'In progress') {
      setRightFilter('Done');
    } else {
      setRightFilter('In progress');
      if (leftFilter === 'In progress') {
        setLeftFilter('Todo');
      }
    }
    setIsCollapsedRight(!isCollapsedRight);
  };

  // Обработчики клавиатурных событий для поддержки доступности
  const handleKeyDownLeft = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleCollapseLeft();
    }
  };
  const handleKeyDownRight = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleCollapseRight();
    }
  };
  const handleKeyDownLeftFilter = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleCollapseLeft();
    }
  };
  const handleKeyDownRightFilter = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      handleToggleCollapseRight();
    }
  };

  const rateInTime = () => {
    setActiveRating('inTime');
  };

  const rateAfterDeadline = () => {
    setActiveRating('afterDeadline');
  };

  const rateAllDone = () => {
    setActiveRating('allDone');
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
        <p className={styles.period}>{`${formattedStartDate} - ${formattedEndDate}`}</p>
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
                  activeRating === 'inTime'
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateInTime}>В срок</button>
              </li>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeRating === 'afterDeadline'
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateAfterDeadline}>После дедлайна</button>
              </li>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeRating === 'allDone'
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
                    activeColumn={activeRating}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.analitics_speed}>
            <h2 className={styles.analitics_header}>
              {leftFilter === 'Todo' && rightFilter === 'In progress'
                ? 'Скорость взятия задач'
                : 'Скорость решения задач'}
            </h2>
            <div className={styles.analitics_speed_filter}>
              <div className={styles.analitics_speed_filter_position}>
                <button
                  className={`${styles.analitics_speed_filter_container} ${
                    isCollapsedLeft ? styles.analitics_speed_filter_opened : undefined
                  } `}
                  onClick={handleToggleCollapseLeft}
                  onKeyDown={handleKeyDownLeft}
                >
                  {leftFilter}
                  {isCollapsedLeft ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
                {isCollapsedLeft && (
                  <button
                    className={styles.analitics_speed_filter_bottom}
                    onClick={changeLeftFilter}
                    onKeyDown={handleKeyDownLeftFilter}
                  >
                    {leftFilter === 'Todo' ? 'In progress' : 'Todo'}
                  </button>
                )}
              </div>
              <ArrowIcon />
              <div className={styles.analitics_speed_filter_position}>
                <button
                  className={`${styles.analitics_speed_filter_container} ${
                    isCollapsedRight ? styles.analitics_speed_filter_opened : undefined
                  } `}
                  onClick={handleToggleCollapseRight}
                  onKeyDown={handleKeyDownRight}
                >
                  {rightFilter}
                  {isCollapsedRight ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </button>
                {isCollapsedRight && (
                  <button
                    className={styles.analitics_speed_filter_bottom}
                    onClick={changeRightFilter}
                    onKeyDown={handleKeyDownRightFilter}
                  >
                    {rightFilter === 'In progress' ? 'Done' : 'In progress'}
                  </button>
                )}
              </div>
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
