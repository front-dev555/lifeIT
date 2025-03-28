import createSagaMiddleware from "redux-saga";
import { reducer } from "./ducks/reducer";
import { rootSaga } from "./ducks/sagas";
import { applyMiddleware, createStore, SagaMiddleware } from "./quax";
import { AppState, Store } from "./ducks/types";
import { AppAction } from "./ducks/actions";
import { Effect } from 'redux-saga/effects';

const createSagaMiddlewareInstance = (): SagaMiddleware<AppState> =>
  createSagaMiddleware<AppState>() as SagaMiddleware<AppState>;

const createStoreWithMiddleware = (sagaMiddleware: SagaMiddleware<AppState>): Store<AppState, AppAction> =>
  createStore<AppState, AppAction>(
    reducer,
    applyMiddleware<AppState, AppAction>(sagaMiddleware)
  );

export const configureStore = (): Store<AppState, AppAction> => {
  const sagaMiddleware = createSagaMiddlewareInstance();
  const store = createStoreWithMiddleware(sagaMiddleware);

  sagaMiddleware.run(rootSaga as () => Generator<Effect, void, unknown>);

  return store;
};
