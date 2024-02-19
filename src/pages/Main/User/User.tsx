import { DragDropContext } from '@hello-pangea/dnd';
import HeaderEmployer from 'components/Header/HeaderEmployer/HeaderEmployer';
import Status from 'components/Status/Status';
import TaskSort from 'components/TasksDND/TasksDND';
import { FC } from 'react';
import { useDispatch, useSelector, useTasksToRender } from 'services/hooks';
import { resetActiveMenu } from 'store/taskMenuActiveSlice';
import updateTaskThunk from 'thunks/update-task-status-thunk';
import { TaskStatus, TtaskState } from 'types/types';
import styles from './User.module.scss';

interface ITaskCard {
  allTasks: TtaskState;
}

const User: FC<ITaskCard> = ({ allTasks }) => {
  const { toDo, inProgress, done, hold } = allTasks;
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);

  const currentUser = useSelector((state) => state.user);
  const todoTasks = useTasksToRender(toDo);
  const inProgressTasks = useTasksToRender(inProgress);
  const doneTasks = useTasksToRender(done);
  const holdTasks = useTasksToRender(hold);
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
        updateTaskThunk({
          id: draggableId,
          data: {
            description: item.description,
            status: dInd,
            deadline_date: item.deadline_date,
            performer: item.performer.id,
          },
        })
      );
    };

    if (!(sInd === dInd)) {
      updateTaskStatus();
    }
  };

  return (
    <section className={styles.section}>
      <HeaderEmployer />
      <div className={styles.statusWrapper}>
        <Status />
        {content.currentContent === 'objectives' && (
          <div className={styles.userTasksWrapper}>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
              <TaskSort tasksArray={todoTasks.tasksToRender} droppableId='to do' />
              <TaskSort
                tasksArray={inProgressTasks.tasksToRender}
                droppableId='in progress'
              />
              <TaskSort tasksArray={doneTasks.tasksToRender} droppableId='done' />
              <TaskSort
                tasksArray={holdTasks.tasksToRender}
                droppableId={TaskStatus.HOLD}
              />
            </DragDropContext>
          </div>
        )}
      </div>
    </section>
  );
};
export default User;
