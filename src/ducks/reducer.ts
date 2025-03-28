import { ActionTypes } from './actionTypes';
import { AppState, Reducer } from './types';

const initialState: AppState = {
  value: 0,
  loading: false,
};

const handleOperationSuccess = (state: AppState, payload: number): AppState => ({
  ...state,
  value: payload,
  loading: false,
});

const handleLoadingStart = (state: AppState): AppState => ({
  ...state,
  loading: true,
});

const handleLoadingEnd = (state: AppState): AppState => ({
  ...state,
  loading: false,
});

export const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.OPERATION_SUCCESS:
      return handleOperationSuccess(state, action.payload);

    case ActionTypes.INCREMENT_ASYNC:
    case ActionTypes.DECREMENT_ASYNC:
    case ActionTypes.INCREMENT_BY_VALUE_ASYNC:
    case ActionTypes.DECREMENT_BY_VALUE_ASYNC:
      return handleLoadingStart(state);

    case ActionTypes.CANCEL_OPERATION:
    case ActionTypes.CANCEL_ALL_OPERATIONS:
      return handleLoadingEnd(state);

    default:
      return state;
  }
};
