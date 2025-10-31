export interface Task {
  id: number;
  text: string;
}

const addTodo = (text: string) => {
  return {
    type: "ADD_TASK" as const,
    payload: {
      id: Date.now(),
      text,
    },
  };
};

const modifyTodo = (task: Task) => {
  return {
    type: "MODIFY_TASK" as const,
    payload: task,
  };
};

const findTodo = (id: number) => {
  return {
    type: "FIND_TASK" as const,
    payload: id,
  };
};

const deleteTodo = (id: number) => {
  return {
    type: "DELETE_TASK" as const,
    payload: id,
  };
};

export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof modifyTodo>
  | ReturnType<typeof findTodo>
  | ReturnType<typeof deleteTodo>;

export { addTodo, modifyTodo, findTodo, deleteTodo };
