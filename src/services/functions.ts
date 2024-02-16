import { TPerformer } from 'types/types';

// Проверка есть ли текущий пользователь в списке
export const handleCheckIfTaskForMe = (id: number, performer: TPerformer) => {
  return performer.id === id;
};
