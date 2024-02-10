import React, { FC, useEffect, useMemo, useState } from 'react';
import HeaderEmployer from 'components/Header/HeaderEmployer/HeaderEmployer';
import Status from 'components/Status/Status';
import { TResults, TTask, TaskStatus } from 'types/types';
import { useSelector, useDispatch } from 'services/hooks';
import { handleCheckIfTaskForMe } from 'services/functions';
import updateTaskThunk from 'thunks/update-task-thunk';
import { resetActiveMenu } from 'store/taskMenuActiveSlice';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskSort from 'components/TasksDND/TasksDND';
import styles from './User.module.scss';

interface ITaskCard {
  allTasks: TTask;
}

const User: FC<ITaskCard> = ({ allTasks }) => {
  const { count, results } = allTasks;
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);

  const [todoTasks, setTodoTasks] = useState<TResults[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TResults[]>([]);
  const [doneTasks, setDoneTasks] = useState<TResults[]>([]);
  const [holdTasks, setHoldTasks] = useState<TResults[]>([]);

  const currentUser = useSelector((state) => state.user);
  const tasksOfUserId = useSelector((state) => state.tasksOfUser).id;

  const resultsToRender = useMemo(
    () =>
      tasksOfUserId !== -1
        ? results.filter((task) => handleCheckIfTaskForMe(tasksOfUserId, task.performers))
        : results,
    [results, tasksOfUserId]
  );

  const onDragStart = () => dispatch(resetActiveMenu());

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    // Статус задачи до дропа
    const sInd = source.droppableId;

    // Статус задачи после дропа
    const dInd = destination.droppableId;

    const itemIndex = allTasks.results.findIndex(
      (elem) => elem.id === Number(draggableId)
    );

    // Таска
    const item = allTasks.results[itemIndex];

    const { status } = item;

    const isCurrentUserLead = currentUser.is_team_lead;

    const canDragToInProgress =
      status === TaskStatus.TO_DO && dInd === TaskStatus.IN_PROGRESS;
    const canDragToToDo =
      status === TaskStatus.ARCHIVED && isCurrentUserLead && dInd === TaskStatus.TO_DO;
    const canDragToDone = status === TaskStatus.IN_PROGRESS && dInd === TaskStatus.DONE;
    const canDragToHold = status === TaskStatus.IN_PROGRESS && dInd === TaskStatus.HOLD;
    const canDragToArchived =
      status === TaskStatus.DONE && isCurrentUserLead && dInd === TaskStatus.ARCHIVED;

    if (
      !canDragToToDo &&
      !canDragToInProgress &&
      !canDragToDone &&
      !canDragToHold &&
      !canDragToArchived
    ) {
      return;
    }
    const updateTaskStatus = () => {
      dispatch(
        updateTaskThunk({
          id: draggableId,
          data: {
            description: item.description,
            status: dInd,
            deadline_date: item.deadline_date,
            performers: item.performers.map((i) => i.id),
          },
        })
      );
    };

    if (!(sInd === dInd)) {
      updateTaskStatus();
    }
  };

  const parseTasks = () => {
    const todo: TResults[] = [];
    const inProgress: TResults[] = [];
    const done: TResults[] = [];
    const hold: TResults[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < resultsToRender.length; i++) {
      if (resultsToRender[i].status === TaskStatus.TO_DO) {
        todo.push(resultsToRender[i]);
      }
      if (resultsToRender[i].status === TaskStatus.IN_PROGRESS) {
        inProgress.push(resultsToRender[i]);
      }
      if (resultsToRender[i].status === TaskStatus.DONE) {
        done.push(resultsToRender[i]);
      }
      if (resultsToRender[i].status === TaskStatus.HOLD) {
        hold.push(results[i]);
      }
    }
    setTodoTasks(todo);
    setInProgressTasks(inProgress);
    setDoneTasks(done);
    setHoldTasks(hold);
  };

  useEffect(() => {
    parseTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsToRender]);

  return (
    <section className={styles.section}>
      <HeaderEmployer />
      <div className={styles.statusWrapper}>
        <Status />
        {content.currentContent === 'objectives' && (
          <div className={styles.userTasksWrapper}>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
              <TaskSort tasksArray={todoTasks} droppableId='to do' />
              <TaskSort tasksArray={inProgressTasks} droppableId='in progress' />
              <TaskSort tasksArray={doneTasks} droppableId='done' />
              <TaskSort tasksArray={holdTasks} droppableId={TaskStatus.HOLD} />
            </DragDropContext>
          </div>
        )}
      </div>
    </section>
  );
};
export default User;
