import { DragDropContext } from '@hello-pangea/dnd';
import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import Status from 'components/Status/Status';
import { FC } from 'react';
import { useDispatch, useSelector, useTasksToRender } from 'services/hooks';
import { openCreateTaskModal } from 'store';
import { resetActiveMenu } from 'store/taskMenuActiveSlice';
import { TaskStatus, TtaskState } from 'types/types';
import { UniversalButton } from 'ui-lib/Buttons';
import TaskSort from '../../../components/TasksDND/TasksDND';
import updateTaskStatusThunk from '../../../thunks/update-task-status-thunk';
import styles from './Lead.module.scss';

interface ITaskCard {
  allTasks: TtaskState;
}

const Lead: FC<ITaskCard> = ({ allTasks }) => {
  const { toDo, inProgress, done, hold } = allTasks;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const todoTasks = useTasksToRender(toDo);
  const inProgressTasks = useTasksToRender(inProgress);
  const doneTasks = useTasksToRender(done);
  const holdTasks = useTasksToRender(hold);

  const openCreateTask = () => {
    dispatch(openCreateTaskModal());
  };

  const onDragStart = () => dispatch(resetActiveMenu());

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    const allTasksArr = [
      ...todoTasks.tasksToRender,
      ...inProgressTasks.tasksToRender,
      ...doneTasks.tasksToRender,
      ...holdTasks.tasksToRender,
    ];
    const itemIndex = allTasksArr.findIndex((elem) => elem.id === Number(draggableId));
    const item = allTasksArr[itemIndex];

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
        updateTaskStatusThunk({
          id: +draggableId,
          curStatus: status,
          newStatus: dInd,
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
              tasksArray={todoTasks.tasksToRender}
              droppableId={TaskStatus.TO_DO}
            />
            <TaskSort
              tasksArray={inProgressTasks.tasksToRender}
              droppableId={TaskStatus.IN_PROGRESS}
            />
            <TaskSort
              tasksArray={doneTasks.tasksToRender}
              droppableId={TaskStatus.DONE}
            />
            <TaskSort
              tasksArray={holdTasks.tasksToRender}
              droppableId={TaskStatus.HOLD}
            />
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Lead;
