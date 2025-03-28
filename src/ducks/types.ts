import { AppAction } from './actions';

export interface AppState {
  value: number;
  loading: boolean;
}

export type Reducer<S = AppState, A = AppAction> = (state: S | undefined, action: A) => S;

export interface Store<S = AppState, A = AppAction> {
  getState: () => S;
  dispatch: (action: A) => A;
  subscribe: (listener: () => void) => () => void;
}

export type Selector<TState = AppState, TResult = unknown> = (state: TState) => TResult;
