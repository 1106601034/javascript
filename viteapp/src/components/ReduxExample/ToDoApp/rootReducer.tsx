// Imports the Task and TodoAction types so the reducer stays type-safe.
import type { Task, TodoAction } from "./actions";

// Declares the shape of the todo slice managed inside Redux.
export interface TodoState {
  // Stores every task entry maintained by the reducer.
  tasks: Task[];
}

// Provides the default todo state before any actions have been handled.
const initialState: TodoState = {
  // Initializes the tasks array as empty.
  tasks: [],
};

// Implements the todo reducer that responds to action dispatches.
const rootReducer = (
  // Supplies the current state or falls back to the initial state.
  state: TodoState = initialState,
  // Receives the discriminated union of todo actions.
  action: TodoAction
  // Returns a new TodoState derived from the existing state and action.
): TodoState => {
  // Branches logic based on the action type name.
  switch (action.type) {
    // Handles adding new tasks to the collection.
    case "ADD_TASK":
      return {
        // copies every existing top-level property of the current state into a new object
        ...state,
        // overwrite the tasks property  with the updated array.
        // state.tasks holds the current list of todo items.
        // ...state.tasks spreads each existing task into a new array literal.
        // action.payload (the newly created task) is appended as the final element of that new array.
        tasks: [...state.tasks, action.payload],
      };
    // Handles removing tasks from the collection.
    case "DELETE_TASK":
      return {
        // Copies any other state fields without modification.
        ...state,
        // Filters out the task whose identifier matches the payload id.
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    // Returns the existing state when the reducer does not recognize the action.
    default:
      return state;
  }
};

// Exports the reducer so the Redux store can register the todo slice.
export default rootReducer;
