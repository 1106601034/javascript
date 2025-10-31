import type { Task, TodoAction } from "./actions";

export interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

const rootReducer = (
  state: TodoState = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
