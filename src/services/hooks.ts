import { useEffect, useMemo, useState } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { TTask } from 'types/types';
import { AppDispatch, AppThunk, RootState } from '../types/store.types';
import { handleCheckIfTaskForMe } from './functions';

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useClose = (styleOfWrapper: string, handleClose: () => void) => {
  const [isRendered, setIsRendered] = useState(false);

  const handleEscapeClick = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleClose();
    }
  };

  const handleOuterClick = (evt: MouseEvent) => {
    if (!isRendered) {
      setIsRendered(true);
    } else if (!(evt.target as HTMLElement).closest(`.${CSS.escape(styleOfWrapper)}`)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);
    document.addEventListener('click', handleOuterClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
      document.removeEventListener('click', handleOuterClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRendered]);
};

export const useTasksToRender = (tasks: TTask | null) => {
  const tasksOfUserId = useSelector((state) => state.tasksOfUser).id;
  const tasksToRender = useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      tasks
        ? tasksOfUserId !== -1
          ? tasks.results.filter((task) =>
              handleCheckIfTaskForMe(tasksOfUserId, task.performer)
            )
          : tasks.results
        : [],
    [tasks, tasksOfUserId]
  );
  return { tasksToRender };
};
