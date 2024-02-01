import { TPerformers } from 'types/types';

// Проверка есть ли текущий пользователь в списке
export const handleCheckIfTaskForMe = (id: number, performers: TPerformers[]) => {
  const res = performers.filter((user) => user.id === id);
  return res.length > 0;
};
