import { useRef } from "react";
// Allows us to obtain a reference to HTML elements.
import { addTodo } from "./actions";
// To add new tasks to the state.
import { useAppDispatch } from "../hooks";

const Task = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addNewTask() {
    const value = inputRef.current?.value.trim();
    if (value) {
      dispatch(addTodo(value));
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="task-component">
      <div className="add-task">
        <input
          type="text"
          placeholder="Add task here..."
          ref={inputRef}
          className="taskInput"
        />
        <button onClick={addNewTask}>Add task</button>
      </div>
    </div>
  );
};

export default Task;
