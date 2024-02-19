import { Draggable, Droppable } from '@hello-pangea/dnd';
import { FC } from 'react';
import Tasks from '../../pages/Tasks/Tasks';
import { handleCheckIfTaskForMe } from '../../services/functions';
import { useSelector } from '../../services/hooks';
import { TResults } from '../../types/types';
import styles from './TasksDND.module.scss';

interface ITaskSort {
  tasksArray: TResults[] | [];
  droppableId: string;
}

const TaskSort: FC<ITaskSort> = ({ tasksArray, droppableId }) => {
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
      {(provided) => (
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
                      ownTask={handleCheckIfTaskForMe(currentUserId, task.performer)}
                      startTime={task.create_date}
                      movedTime={task.inprogress_date}
                      completedTime={task.deadline_date}
                      status={task.status}
                      taskID={task.id}
                      performer={task.performer.id}
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

export default TaskSort;
