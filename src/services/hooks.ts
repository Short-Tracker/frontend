import { useEffect, useState } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types/store.types';

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
