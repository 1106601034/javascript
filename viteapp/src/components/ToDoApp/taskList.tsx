// Imports the deleteTodo action creator so tasks can be removed.
import { deleteTodo } from "./actions";
// Imports typed hooks for accessing dispatch and state.
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Defines the component that renders the list of todo items.
const TaskList = () => {
  // Selects the tasks array from the Redux todo slice.
  const tasks = useAppSelector((state) => state.todo.tasks);
  // Retrieves the typed dispatch function for firing actions.
  const dispatch = useAppDispatch();

  // Dispatches an action to remove the task that matches the provided id.
  const handleDelete = (id: number) => {
    // Sends the deleteTodo action to the reducer with the matching identifier.
    dispatch(deleteTodo(id));
  };

  // Renders the list of tasks along with delete controls.
  return (
    // Wraps the rendered list for easier styling.
    <div className="tasklist">
      {/* Groups the heading and task items visually. */}
      <div className="display-tasks">
        {/* Labels the list so users know what is being shown. */}
        <h5>Your tasks:</h5>
        {/* Structures the tasks in an unordered list. */}
        <ul className="tasks">
          {/* Iterates over each task fetched from Redux state. */}
          {tasks.map((task) => (
            // Renders a list item for the current task and assigns a unique key.
            <li className="task" key={task.id}>
              {/* Displays the textual content stored on the task. */}
              {task.text}
              {/* Provides a delete button for removing the current task. */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Exports the component so other modules can render the task list.
export default TaskList;
