import { Effect } from 'redux-saga/effects';
import { AppState } from '../ducks/types';
import { AppAction } from '../ducks/actions';

export interface Store<S = AppState, A = AppAction> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: () => void): () => void;
}

export interface StoreEnhancer<S = AppState, A = AppAction> {
  (createStore: StoreCreator<S, A>): StoreCreator<S, A>;
}

export type StoreCreator<S = AppState, A = AppAction> = (
  reducer: (state: S | undefined, action: A) => S,
  enhancer?: StoreEnhancer<S, A>
) => Store<S, A>;

export interface MiddlewareAPI<S = AppState, A = AppAction> {
  dispatch: (action: A) => A;
  getState: () => S;
}

export type Dispatch<A = AppAction> = (action: A) => A;

export type Middleware<S = AppState, A = AppAction> = (
  api: MiddlewareAPI<S, A>
) => (next: Dispatch<A>) => Dispatch<A>;

export type SagaMiddleware<S = AppState> = Middleware<S, AppAction> & {
  run: (saga: () => Generator<Effect, void, unknown>) => void;
};

export type UnknownAction = { type: string };
