import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { AppState, Store, Selector } from '../ducks/types';
import { AppAction } from '../ducks/actions';

interface StoreContextValue<S = AppState, A = AppAction> {
  store: Store<S, A>;
  dispatch: (action: A) => A;
}

const StoreContext = createContext<StoreContextValue | null>(null);

interface StoreProviderProps {
  store: Store<AppState, AppAction>;
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  const [state, setState] = useState<AppState>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return () => {
      unsubscribe();
    };
  }, [store]);

  const value: StoreContextValue = {
    store,
    dispatch: store.dispatch,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useQuaxStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useQuaxStore must be used within a StoreProvider');
  }
  return context;
};

export const useQuaxDispatch = () => {
  const { dispatch } = useQuaxStore();
  return dispatch;
};

export function useQuaxSelector<TResult = unknown>(
  selector: Selector<AppState, TResult>
): TResult {
  const { store } = useQuaxStore();
  const [result, setResult] = useState<TResult>(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setResult(selector(store.getState()));
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return result;
}
