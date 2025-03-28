import { StoreCreator, StoreEnhancer, Dispatch, Middleware } from './types';
import { AppState } from '../ducks/types';
import { AppAction } from '../ducks/actions';

export const applyMiddleware = <S = AppState, A = AppAction>(
  ...middlewares: Middleware<S, A>[]
): StoreEnhancer<S, A> => {
  return (createStore: StoreCreator<S, A>) =>
    (reducer: (state: S | undefined, action: A) => S) => {
      const store = createStore(reducer);
      let dispatch: Dispatch<A> = () => {
        throw new Error('Dispatching while constructing your middleware is not allowed.');
      };

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action: A) => dispatch(action),
      };

      const chain = middlewares.map(middleware => middleware(middlewareAPI));
      dispatch = chain.reduceRight(
        (next, middleware) => middleware(next),
        store.dispatch
      );

      return {
        ...store,
        dispatch,
      };
    };
};
