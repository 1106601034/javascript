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

// Builds a  union of every todo action supported by the reducer.
// only those specific actions can be dispatched to the store.
export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof modifyTodo>
  | ReturnType<typeof findTodo>
  | ReturnType<typeof deleteTodo>;

// Exports the action creators so components and tests can dispatch them.
// typeof addTodo grabs the function type of addTodo.
// ReturnType<> is a built-in generic utility that takes a function type and produces the type of its return value.
export { addTodo, modifyTodo, findTodo, deleteTodo };
// Since addTodo returns an action object:
//  { type: "ADD_TASK"; payload: { id: number; text: string } },
// the expression expands to exactly that structure.
// Using ReturnType keeps the action typings in sync automatically
// if you ever change addTodo’s payload,
// the union type picks it up instantly.
