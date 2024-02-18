import { TPerformer, TtaskState } from 'types/types';

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
