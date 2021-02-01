export const sleep = (timeMs: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeMs);
  });
};
