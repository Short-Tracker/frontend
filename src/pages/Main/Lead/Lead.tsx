import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import Status from 'components/Status/Status';
import Tasks from 'pages/Tasks/Tasks';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'services/hooks';
import { openCreateTaskModal } from 'store';
import { resetActiveMenu } from 'store/taskMenuActiveSlice';
import { TPerformers, TResults, TTask, TaskStatus } from 'types/types';
import { UniversalButton } from 'ui-lib/Buttons';
import updateTaskThunk from '../../../thunks/update-task-thunk';
import styles from './Lead.module.scss';

interface ITaskSort {
  tasksArray: TResults[];
  handleCheckTaskOwner: (performers: TPerformers[]) => boolean;
  droppableId: string;
}

const TaskSort: FC<ITaskSort> = (props) => {
  const { tasksArray, handleCheckTaskOwner, droppableId } = props;

  const { is_team_lead: isCurrentUserLead, id: currentUserId } = useSelector(
    (state) => state.user
  );

  const getStyle = (style: any, snapshot: any) => {
    if (!snapshot.isDragging) return {};
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      transitionDuration: '0.001s',
    };
  };

  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className={styles.taskColumn}>
            {tasksArray.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                  >
                    <Tasks
                      text={task.description}
                      date={task.create_date}
                      headerText={task.creator.full_name}
                      ownTask={handleCheckTaskOwner(task.performers)}
                      startTime={task.create_date}
                      movedTime={task.inprogress_date}
                      completedTime={task.deadline_date}
                      status={task.status}
                      taskID={task.id}
                      taskCreatorId={task.creator.id}
                      isCurrentUserLead={isCurrentUserLead}
                      currentUserId={currentUserId}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};

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
      if (results[i].status === TaskStatus.TO_DO) {
        todo.push(results[i]);
      }
      if (results[i].status === TaskStatus.IN_PROGRESS) {
        inProgress.push(results[i]);
      }
      if (results[i].status === TaskStatus.DONE) {
        done.push(results[i]);
      }
      if (results[i].status === TaskStatus.HOLD) {
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
    const res = performers.filter((user) => user.id === currentUser.id);
    return res.length > 0;
  };

  useEffect(() => {
    if (results.length >= 1) {
      parseTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const onDragStart = () => dispatch(resetActiveMenu());

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    const itemIndex = allTasks.results.findIndex(
      (elem) => elem.id === Number(draggableId)
    );
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
            // performers,
            performers: [2],
          },
        })
      );
    };

    if (!(sInd === dInd)) {
      updateTaskStatus();
    }
  };

  return (
    <div className={styles.Lead__container}>
      <SideBar />
      <div className={styles.Lead__tasks}>
        <div className={styles.Lead__serchContainer}>
          <Search />
          <UniversalButton onClick={openCreateTask} width='244'>
            <p>Создать задачу</p>
          </UniversalButton>
        </div>
        <Status />
        <div className={styles.tasksWrapper}>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <TaskSort
              tasksArray={todoTasks}
              handleCheckTaskOwner={handleCheckTaskOwner}
              droppableId={TaskStatus.TO_DO}
            />
            <TaskSort
              tasksArray={inProgressTasks}
              handleCheckTaskOwner={handleCheckTaskOwner}
              droppableId={TaskStatus.IN_PROGRESS}
            />
            <TaskSort
              tasksArray={doneTasks}
              handleCheckTaskOwner={handleCheckTaskOwner}
              droppableId={TaskStatus.DONE}
            />
            <TaskSort
              tasksArray={holdTasks}
              handleCheckTaskOwner={handleCheckTaskOwner}
              droppableId={TaskStatus.HOLD}
            />
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Lead;
