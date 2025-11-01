// Imports React's useRef hook to access the input DOM element directly.
import { useRef } from "react";
// Imports the addTodo action creator to push new tasks into Redux.
import { addTodo } from "./actions";
// Imports the typed dispatch hook to interact with the store.
import { useAppDispatch } from "../hooks";

// Defines the component responsible for creating new todo items.
const Task = () => {
  // Retrieves the typed dispatch function from the Redux hook.
  const dispatch = useAppDispatch();
  // Creates a reference to the input element so we can read and reset its value.
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Adds a new todo when the user submits text.
  function addNewTask() {
    // Pulls the trimmed text value from the input if it is mounted.
    const value = inputRef.current?.value.trim();
    // Only dispatches if the user provided non-empty content.
    if (value) {
      // Sends the addTodo action with the user's text to the reducer.
      dispatch(addTodo(value));
      // Clears the input after successfully creating a task.
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  // Renders the input field and button used to create tasks.
  return (
    // Wraps the creator UI in a container for styling.
    <div className="task-component">
      {/* Groups the text box and button for layout purposes. */}
      <div className="add-task">
        {/* Renders a text input bound to the ref so we can read its value. */}
        <input
          type="text"
          placeholder="Add task here..."
          ref={inputRef}
          className="taskInput"
        />
        {/* Renders a button that triggers task creation when clicked. */}
        <button onClick={addNewTask}>Add task</button>
      </div>
    </div>
  );
};

// Exports the component so the Redux demo page can include it.
export default Task;
