export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): ((...args: Args) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer: any;
  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
