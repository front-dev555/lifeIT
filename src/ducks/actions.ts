import { ActionTypes, ActionType } from './actionTypes';

type BaseAction<T extends ActionType> = {
  type: T;
};

type OperationSuccessAction = BaseAction<typeof ActionTypes.OPERATION_SUCCESS> & {
  payload: number;
};

type IncrementByValueAction = BaseAction<typeof ActionTypes.INCREMENT_BY_VALUE_ASYNC> & {
  payload: number;
};

type DecrementByValueAction = BaseAction<typeof ActionTypes.DECREMENT_BY_VALUE_ASYNC> & {
  payload: number;
};

type SimpleAction = BaseAction<
  | typeof ActionTypes.INCREMENT_ASYNC
  | typeof ActionTypes.DECREMENT_ASYNC
  | typeof ActionTypes.CANCEL_OPERATION
  | typeof ActionTypes.CANCEL_ALL_OPERATIONS
>;

export type AppAction =
  | OperationSuccessAction
  | IncrementByValueAction
  | DecrementByValueAction
  | SimpleAction;

export const createIncrementAction = (): SimpleAction => ({
  type: ActionTypes.INCREMENT_ASYNC,
});

export const createIncrementByValueAction = (payload: number): IncrementByValueAction => ({
  type: ActionTypes.INCREMENT_BY_VALUE_ASYNC,
  payload,
});

export const createDecrementAction = (): SimpleAction => ({
  type: ActionTypes.DECREMENT_ASYNC,
});

export const createDecrementByValueAction = (payload: number): DecrementByValueAction => ({
  type: ActionTypes.DECREMENT_BY_VALUE_ASYNC,
  payload,
});

export const createOperationSuccessAction = (payload: number): OperationSuccessAction => ({
  type: ActionTypes.OPERATION_SUCCESS,
  payload,
});

export const createLoadingEndAction = (): SimpleAction => ({
  type: ActionTypes.CANCEL_OPERATION,
});

export const createCancelAllOperationsAction = (): SimpleAction => ({
  type: ActionTypes.CANCEL_ALL_OPERATIONS,
});
