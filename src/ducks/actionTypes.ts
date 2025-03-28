export const ActionTypes = {
  INCREMENT_ASYNC: 'INCREMENT_ASYNC',
  DECREMENT_ASYNC: 'DECREMENT_ASYNC',
  INCREMENT_BY_VALUE_ASYNC: 'INCREMENT_BY_VALUE_ASYNC',
  DECREMENT_BY_VALUE_ASYNC: 'DECREMENT_BY_VALUE_ASYNC',
  OPERATION_SUCCESS: 'OPERATION_SUCCESS',
  CANCEL_OPERATION: 'CANCEL_OPERATION',
  CANCEL_ALL_OPERATIONS: 'CANCEL_ALL_OPERATIONS'
} as const;

export type ActionType = typeof ActionTypes[keyof typeof ActionTypes];
