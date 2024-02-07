import { EventHandler, KeyboardEvent } from 'react';
import { TPerformers } from 'types/types';

// Проверка есть ли текущий пользователь в списке
export const handleCheckIfTaskForMe = (id: number, performers: TPerformers[]) => {
  const res = performers.filter((user) => user.id === id);
  return res.length > 0;
};

// eslint-disable-next-line
export function buttonize<T>(handler: EventHandler<any>) {
  return {
    role: 'button',
    onClick: handler,
    tabIndex: 0,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === 'Enter') handler(event);
    },
  };
}
