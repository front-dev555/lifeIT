export const makeOperation = (
  value: number,
  additional: number,
  signal?: AbortSignal
): Promise<number> =>
  new Promise<number>((resolve, reject) => {
    const isOk = Math.random() > 0.3;
    const timeoutId = setTimeout(() => {
      if (isOk) {
        resolve(value + additional);
      } else {
        reject(new Error('Ой что-то беку поплохело'));
      }
    }, 1000);

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Операция была отменена'));
      });
    }
  });
