import {
  put,
  takeLatest,
  select,
  call,
  SelectEffect,
  CallEffect,
  PutEffect,
  CancelledEffect,
  TakeEffect,
} from 'redux-saga/effects';
import {
  createOperationSuccessAction,
  createIncrementByValueAction,
  createDecrementByValueAction,
  createLoadingEndAction,
  AppAction,
} from './actions';
import { ActionTypes } from './actionTypes';
import { makeOperation } from '../api';
import { AppState } from './types';

type SagaEffect =
  | SelectEffect
  | CallEffect<number>
  | CallEffect<void>
  | PutEffect<AppAction>
  | CancelledEffect
  | TakeEffect;

const selectValue: (state: AppState) => number = (state) => state.value;
let controller: AbortController;
function* handleOperation(
  currentValue: number,
  delta: number
): Generator<SagaEffect, void, number> {
  controller = new AbortController();
  try {
    const result = yield call(
      makeOperation,
      currentValue,
      delta,
      controller.signal
    );
    yield put(createOperationSuccessAction(result));
  } catch (error) {
    alert(error); // можно конечно модалку, но это тестовое слишком большое оказалось по факту
    yield put(createLoadingEndAction());
  }
}

function* handleIncrement(): Generator<SagaEffect, void, number> {
  const currentValue = yield select(selectValue);
  yield call(handleOperation, currentValue, 1);
}

function* handleDecrement(): Generator<SagaEffect, void, number> {
  const currentValue = yield select(selectValue);
  yield call(handleOperation, currentValue, -1);
}

function* handleIncrementByValue(
  action: ReturnType<typeof createIncrementByValueAction>
): Generator<SagaEffect, void, number> {
  const currentValue = yield select(selectValue);
  yield call(handleOperation, currentValue, action.payload);
}

function* handleDecrementByValue(
  action: ReturnType<typeof createDecrementByValueAction>
): Generator<SagaEffect, void, number> {
  const currentValue = yield select(selectValue);
  yield call(handleOperation, currentValue, -action.payload);
}

function* handleCancelOperation(): Generator<SagaEffect, void, number> {
  yield put(createLoadingEndAction());
  if (controller) {
    controller.abort();
  }
}

export function* rootSaga() {
  yield takeLatest(ActionTypes.INCREMENT_ASYNC, handleIncrement);
  yield takeLatest(ActionTypes.DECREMENT_ASYNC, handleDecrement);
  yield takeLatest(
    ActionTypes.INCREMENT_BY_VALUE_ASYNC,
    handleIncrementByValue
  );
  yield takeLatest(
    ActionTypes.DECREMENT_BY_VALUE_ASYNC,
    handleDecrementByValue
  );
  yield takeLatest(ActionTypes.CANCEL_ALL_OPERATIONS, handleCancelOperation);
}
