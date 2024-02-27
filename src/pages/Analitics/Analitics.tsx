import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import Preloader from 'components/Preloader/Preloader';
import SideBar from 'components/SideBar/SideBar';
import { openCreateTaskModal } from 'store';
import { UniversalButton } from 'ui-lib/Buttons';
import Search from 'components/Search/Search';
import { AnaliticsString } from 'components/AnaliticsString/AnaliticsString';
import { ArrowDownIcon, ArrowIcon, ArrowUpIcon } from 'ui-lib/Icons';
import getAnaliticsThunk from 'thunks/get-analitics-thunks';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale/ru';
import { TAnaliticsPerformer } from 'types/types';
import styles from './Analitics.module.scss';

const Analitics = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector((state) => state.system);
  const [isCollapsedLeft, setIsCollapsedLeft] = React.useState(false);
  const [isCollapsedRight, setIsCollapsedRight] = React.useState(false);
  const [activeRating, setActiveRating] = React.useState('on_time_count');
  const [leftFilter, setLeftFilter] = React.useState('Todo');
  const [rightFilter, setRightFilter] = React.useState('In progress');

  const taskAnalitics = useSelector((state) => state.taskAnalitics);
  const performers = taskAnalitics.performers_analytics;

  // Обособление 2х рэйтингов, получаемых из 1 state
  const [ratingPerformers, setRatingPerformers] =
    React.useState<TAnaliticsPerformer[]>(performers);
  const [speedPerformers, setSpeedPerformers] =
    React.useState<TAnaliticsPerformer[]>(performers);

  // TO DO - убрать после исправлений получаемых данных на бэке
  const ratingPerformer: string[] = [];
  const speedPerformer: string[] = [];
  //

  // по умолчанию аналитика рассчитывается за последнюю неделю, включая текущую дату
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  const startDate = new Date(endDate);
  // startDate.setDate(startDate.getDate() - 6);
  startDate.setDate(1);

  // форматирование даты для страницы
  const pageStartDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(startDate);
  const pageEndDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(endDate);

  // форматирование даты для запроса
  function formattedValue(value: Date) {
    return value && !Array.isArray(value)
      ? format(value, 'yyyy-MM-dd', { locale: ru })
      : '';
  }
  const formattedStartDate = formattedValue(startDate);
  const formattedEndDate = formattedValue(endDate);
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
      setSpeedPerformers(performers);
      if (rightFilter === 'In progress') {
        setRightFilter('Done');
        setSpeedPerformers(performers);
      }
    } else {
      setLeftFilter('Todo');
      setSpeedPerformers(performers);
    }
    setIsCollapsedLeft(!isCollapsedLeft);
  };

  const changeRightFilter = () => {
    if (rightFilter === 'In progress') {
      setRightFilter('Done');
      setSpeedPerformers(performers);
    } else {
      setRightFilter('In progress');
      setSpeedPerformers(performers);
      if (leftFilter === 'In progress') {
        setLeftFilter('Todo');
        setSpeedPerformers(performers);
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

  function chooseAvgTime(performer: TAnaliticsPerformer) {
    if (leftFilter === 'Todo' && rightFilter === 'In progress') {
      return performer.avg_time_create_date_to_inprogress_date;
    }
    if (leftFilter === 'Todo' && rightFilter === 'Done') {
      return performer.avg_time_create_date_to_done_date;
    }
    if (leftFilter === 'In progress' && rightFilter === 'Done') {
      return performer.avg_time_inprogress_date_to_done_date;
    }
    return '';
  }

  const rateInTime = () => {
    setActiveRating('on_time_count');
    setRatingPerformers(performers);
  };

  const rateAfterDeadline = () => {
    setActiveRating('with_delay_count');
    setRatingPerformers(performers);
  };

  const rateAllDone = () => {
    setActiveRating('total_tasks');
    setRatingPerformers(performers);
  };

  function formatTime(minutes: string) {
    const num = parseInt(minutes, 10);
    const days = Math.floor(num / 1440);
    const hours = Math.floor((num % 1440) / 60);
    const mins = num % 60;

    return `${days ? `${days} д ` : ''}${hours ? `${hours} ч ` : ''}${mins} мин`;
  }

  useEffect(() => {
    dispatch(
      getAnaliticsThunk(isLoggedIn, {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        sort_by: activeRating,
      })
    );
  }, [isLoggedIn, activeRating, dispatch, formattedStartDate, formattedEndDate]);

  return (
    <div className={styles.page_container}>
      {isLoading && <Preloader />}
      <SideBar />
      <div className={styles.page_analitics}>
        <div className={styles.page_serchContainer}>
          <Search />
          <UniversalButton onClick={openCreateTask} width='244'>
            <p>Создать задачу</p>
          </UniversalButton>
        </div>
        <p className={styles.period}>{`${pageStartDate} - ${pageEndDate}`}</p>
        <div className={styles.analitics}>
          <div className={styles.analitics_general}>
            <h2 className={styles.analitics_header}>
              Общая продуктивность команды по решенным задачам
            </h2>
            <div className={styles.analitics_general_done}>
              <div className={styles.analitics_general_done_intime}>
                <span className={styles.analitics_general_done_number}>
                  {taskAnalitics.total_tasks_on_time}
                </span>
                <span className={styles.analitics_general_done_text}>решено в срок</span>
              </div>
              <div className={styles.analitics_general_done_after}>
                <span
                  className={`${styles.analitics_general_done_number} ${styles.analitics_general_done_number_grey}`}
                >
                  {taskAnalitics.total_tasks_with_delay}
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
                  activeRating === 'on_time_count'
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateInTime}>В срок</button>
              </li>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeRating === 'with_delay_count'
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateAfterDeadline}>После дедлайна</button>
              </li>
              <li
                className={`${styles.analitics_rating_filter_container} ${
                  activeRating === 'total_tasks'
                    ? styles.analitics_rating_filter_container_active
                    : undefined
                }`}
              >
                <button onClick={rateAllDone}>Общее количество</button>
              </li>
            </ul>
            <div className={styles.analitics_performers}>
              {ratingPerformers.map((performer, index) => {
                if (!ratingPerformer.includes(performer.performer_name)) {
                  ratingPerformer.push(performer.performer_name);
                  const newIndex = ratingPerformer.length - 1;
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <AnaliticsString
                        performer={performer.performer_name}
                        index={newIndex}
                        inTime={performer.on_time_count}
                        afterDeadline={performer.with_delay_count}
                        all={performer.total_tasks}
                        activeColumn={activeRating}
                      />
                    </div>
                  );
                }
                return '';
              })}
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
              {speedPerformers.map((performer, index) => {
                if (!speedPerformer.includes(performer.performer_name)) {
                  speedPerformer.push(performer.performer_name);
                  const newIndexP = speedPerformer.length - 1;
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <AnaliticsString
                        performer={performer.performer_name}
                        index={newIndexP}
                        time={formatTime(chooseAvgTime(performer))}
                      />
                    </div>
                  );
                }
                return '';
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analitics;
