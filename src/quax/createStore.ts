import { Store, StoreEnhancer } from './types';
import { AppAction } from '../ducks/actions';
import { AppState } from '../ducks/types';

export const createStore = <S = AppState, A = AppAction>(
  reducer: (state: S | undefined, action: A) => S,
  enhancer?: StoreEnhancer<S, A>
): Store<S, A> => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = reducer(undefined, {} as A);
  let currentListeners = new Set<() => void>();
  let isDispatching = false;

  return {
    getState: () => currentState,

    dispatch: (action: A) => {
      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
      }

      try {
        isDispatching = true;
        currentState = reducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      currentListeners.forEach(listener => listener());
      return action;
    },

    subscribe: (listener: () => void) => {
      currentListeners.add(listener);
      return () => {
        currentListeners.delete(listener);
      };
    }
  };
};
