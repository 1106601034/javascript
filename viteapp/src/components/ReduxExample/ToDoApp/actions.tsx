// Declares the data contract for a todo item managed by Redux.
export interface Task {
  // Uniquely identifies the task when stored in arrays.
  id: number;
  // Stores the textual description of the task.
  text: string;
}

// Creates an action for adding a new todo item to the collection.
const addTodo = (text: string) => {
  return {
    // Names the action so the reducer can match it.
    type: "ADD_TASK" as const,
    // Provides the Task payload describing the new item.
    payload: {
      // Generates a timestamp-based unique identifier.
      id: Date.now(),
      // Stores the text provided by the caller.
      text,
    },
  };
};

// Creates an action that requests updating an existing todo entry.
const modifyTodo = (task: Task) => {
  return {
    // Names the action so the reducer can match it.
    type: "MODIFY_TASK" as const,
    // Supplies the full Task object with updated fields.
    payload: task,
  };
};

// Creates an action that asks the reducer to locate a specific todo.
const findTodo = (id: number) => {
  return {
    // Names the action so the reducer can match it.
    type: "FIND_TASK" as const,
    // Carries the identifier of the desired task.
    payload: id,
  };
};

// Creates an action instructing the reducer to remove a todo.
const deleteTodo = (id: number) => {
  return {
    // Names the action so the reducer can match it.
    type: "DELETE_TASK" as const,
    // Carries the identifier of the task to delete.
    payload: id,
  };
};

// Builds a discriminated union of every todo action supported by the reducer.
export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof modifyTodo>
  | ReturnType<typeof findTodo>
  | ReturnType<typeof deleteTodo>;

// Exports the action creators so components and tests can dispatch them.
export { addTodo, modifyTodo, findTodo, deleteTodo };
