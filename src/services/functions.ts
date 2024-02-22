import { EventHandler, KeyboardEvent } from 'react';
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

export const getDateString = (date: Date) => {
  return date
    .toLocaleDateString('ru', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(' в ', ', ');
};
