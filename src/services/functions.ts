import { TPerformer, TaskStatus, TtaskState } from 'types/types';

// Проверка есть ли текущий пользователь в списке
export const handleCheckIfTaskForMe = (id: number, performer: TPerformer) => {
  return performer.id === id;
};

// считаем количество приходящих тасок
export const handleCheckCount = (arr: TtaskState[]) => {
  return arr.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
};

export const getStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TO_DO:
      return 'toDo';
    case TaskStatus.IN_PROGRESS:
      return 'inProgress';
    default:
      return status;
  }
};
