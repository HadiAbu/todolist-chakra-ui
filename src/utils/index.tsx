import { Todo } from "../store";

export const sortFunc = (arr: Array<Todo>, key: string) => {
  let sorted = [...arr];
  sorted = sorted.sort((x: Todo, y: Todo) => {
    if (x[key as keyof Todo] >= y[key as keyof Todo]) return 1;
    else return -1;
  });
  return sorted;
};
