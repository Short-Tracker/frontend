import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import Tasks from 'pages/Tasks/Tasks';
import React, { FC, useEffect, useState } from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import Status from 'components/Status/Status';
import { TPerformers, TResults, TTask } from 'types/types';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'services/hooks';
import { openCreateTaskModal } from 'store';
import type { DroppableProvided } from '@hello-pangea/dnd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import styles from './Lead.module.scss';

interface ITaskCard {
  allTasks: TTask;
}

const Lead: FC<ITaskCard> = (props) => {
  const { allTasks } = props;
  const { count, results } = allTasks;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const openCreateTask = () => {
    dispatch(openCreateTaskModal());
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [todoTasks, setTodoTasks] = useState<TResults[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TResults[]>([]);
  const [doneTasks, setDoneTasks] = useState<TResults[]>([]);
  const [holdTasks, setHoldTasks] = useState<TResults[]>([]);

  const parseTasks = () => {
    const todo: TResults[] = [];
    const inProgress: TResults[] = [];
    const done: TResults[] = [];
    const hold: TResults[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < results.length; i++) {
      if (results[i].status === 'to do') {
        todo.push(results[i]);
      }
      if (results[i].status === 'in progress') {
        inProgress.push(results[i]);
      }
      if (results[i].status === 'done') {
        done.push(results[i]);
      }
      if (results[i].status === 'hold') {
        hold.push(results[i]);
      }
    }
    setTodoTasks(todo);
    setInProgressTasks(inProgress);
    setDoneTasks(done);
    setHoldTasks(hold);
  };
  // Проверка есть ли текущий пользователь в списке
  const handleCheckTaskOwner = (performers: TPerformers[]) => {
    const res = performers.filter((user) => user.full_name === currentUser.full_name);
    return res.length > 0;
  };

  useEffect(() => {
    if (results.length >= 1) {
      parseTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // if (sInd === dInd) {
    //   const items = reorder(state[sInd], source.index, destination.index);
    //   const newState = [...state];
    //   newState[sInd] = items;
    //   setState(newState);
    // } else {
    //   const result = move(state[sInd], state[dInd], source, destination);
    //   const newState = [...state];
    //   newState[sInd] = result[sInd];
    //   newState[dInd] = result[dInd];
    //
    //   setState(newState.filter(group => group.length));
  };

  return (
    <div className={styles.Lead__container}>
      <SideBar />
      <div className={styles.Lead__tasks}>
        <div className={styles.Lead__serchContainer}>
          <Search />
          <UniversalButton onClick={openCreateTask} width="244">
            <p>Создать задачу</p>
          </UniversalButton>
        </div>
        <Status />
        <div className={styles.tasksWrapper}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todoTasks">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className={styles.taskColumn}>
                    {todoTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Tasks
                              isLead={task.creator.is_team_lead}
                              text={task.description}
                              date={task.create_date}
                              headerText={task.creator.full_name}
                              ownTask={handleCheckTaskOwner(task.performers)}
                              startTime={task.create_date}
                              movedTime={task.inprogress_date}
                              completedTime={task.deadline_date}
                              status={task.status}
                              taskID={task.id}
                              performers={task.performers}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className={styles.taskColumn}>
            {inProgressTasks.map((task) => (
              <Tasks
                key={uuidv4()}
                isLead={task.creator.is_team_lead}
                text={task.description}
                date={task.create_date}
                headerText={task.creator.full_name}
                ownTask={handleCheckTaskOwner(task.performers)}
                startTime={task.create_date}
                movedTime={task.inprogress_date}
                completedTime={task.deadline_date}
                status={task.status}
                taskID={task.id}
                performers={task.performers}
              />
            ))}
          </div>
          <div className={styles.taskColumn}>
            {doneTasks.map((task) => (
              <Tasks
                key={uuidv4()}
                isLead={task.creator.is_team_lead}
                text={task.description}
                date={task.create_date}
                headerText={task.creator.full_name}
                ownTask={handleCheckTaskOwner(task.performers)}
                startTime={task.create_date}
                movedTime={task.inprogress_date}
                completedTime={task.deadline_date}
                status={task.status}
                taskID={task.id}
                performers={task.performers}
              />
            ))}
          </div>
          <div className={styles.taskColumn}>
            {holdTasks.map((task) => (
              <Tasks
                key={uuidv4()}
                isLead={task.creator.is_team_lead}
                text={task.description}
                date={task.create_date}
                headerText={task.creator.full_name}
                ownTask={handleCheckTaskOwner(task.performers)}
                startTime={task.create_date}
                movedTime={task.inprogress_date}
                completedTime={task.deadline_date}
                status={task.status}
                taskID={task.id}
                performers={task.performers}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lead;
