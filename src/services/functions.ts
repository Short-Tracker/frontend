import { EventHandler, KeyboardEvent } from 'react';
import { TPerformer } from 'types/types';

// Проверка есть ли текущий пользователь в списке
export const handleCheckIfTaskForMe = (id: number, performer: TPerformer) => {
  return performer.id === id;
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
