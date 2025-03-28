import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useCallback,
  useMemo,
} from 'react';
import { useQuaxDispatch, useQuaxSelector } from './quax/useQuaxStore';
import { Value } from './components/Value/Value';
import { Button } from './components/Button/Button';
import {
  createCancelAllOperationsAction,
  createIncrementAction,
  createDecrementAction,
  createIncrementByValueAction,
  createDecrementByValueAction,
} from './ducks/actions';
import './App.css';

export default function App() {
  const dispatch = useQuaxDispatch();
  const [value, setValue] = useState('');
  const isLoading = useQuaxSelector((state) => state.loading);

  const setCounterByValue = useCallback(
    (actionType: 'inc' | 'dec') => () => {
      if (!value || isNaN(+value) || +value <= 0) {
        return;
      }
      if (actionType === 'inc') {
        dispatch(createIncrementByValueAction(+value));
      } else {
        dispatch(createDecrementByValueAction(+value));
      }
    },
    [dispatch, value]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    if (/\D/.test(pasteData)) {
      e.preventDefault();
    }
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '');
    setValue(newValue);
  }, []);

  const clickHandler = useCallback(
    (actionType: 'inc' | 'dec') => () => {
      if (actionType === 'inc') {
        dispatch(createIncrementAction());
      } else {
        dispatch(createDecrementAction());
      }
    },
    [dispatch]
  );

  const cancelOperation = useCallback(() => {
    dispatch(createCancelAllOperationsAction());
    setValue('');
  }, [dispatch]);

  const incrementButton = useMemo(
    () => (
      <Button
        text="Увеличить"
        onClick={clickHandler('inc')}
        disabled={isLoading}
      />
    ),
    [clickHandler, isLoading]
  );

  const decrementButton = useMemo(
    () => (
      <Button
        text="Уменьшить"
        onClick={clickHandler('dec')}
        disabled={isLoading}
      />
    ),
    [clickHandler, isLoading]
  );

  const isInputInvalid = !value || isNaN(+value) || +value <= 0;

  const incrementByValueButton = useMemo(
    () => (
      <Button
        text="Увеличить на значение"
        onClick={setCounterByValue('inc')}
        disabled={isLoading || isInputInvalid}
        className={isInputInvalid ? 'disabled' : ''}
      />
    ),
    [setCounterByValue, isInputInvalid, isLoading]
  );

  const decrementByValueButton = useMemo(
    () => (
      <Button
        text="Уменьшить на значение"
        onClick={setCounterByValue('dec')}
        disabled={isLoading || isInputInvalid}
        className={isInputInvalid ? 'disabled' : ''}
      />
    ),
    [setCounterByValue, isInputInvalid, isLoading]
  );

  const cancelButton = useMemo(
    () => (
      <Button
        text="Отменить операцию"
        onClick={cancelOperation}
        disabled={!isLoading}
        className={`cancel-btn ${isLoading ? '' : 'disabled'}`}
      />
    ),
    [cancelOperation, isLoading]
  );

  return (
    <div className="app">
      <Value />
      <div className="controls">
        {incrementButton}
        {decrementButton}
      </div>
      <div className="input-container">
        <input
          className="input"
          placeholder="изменить на значение"
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="Введите число"
        />
        <div className="button-group">
          {incrementByValueButton}
          {decrementByValueButton}
        </div>
      </div>
      {cancelButton}
    </div>
  );
}
