import { useRef } from "react";
// Allows us to obtain a reference to HTML elements.
import { useDispatch } from "react-redux";
// To dispatch the addTodo action.
import { addToDo } from "./actions";
// To add new tasks to the state.

const Task = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  function addNewTask() {
    const task = inputRef.current.value.trim();
    if (task !== "") {
      dispatch(addToDo(task));
      inputRef.current.value = "";
    }
  }

  return (
    <div className="task-component">
      <div className="add-task">
        <input type="text" ref={inputRef} placeholder="Enter a new task" />
        <button onClick={addNewTask}>Add Task</button>
      </div>
    </div>
  );
};
