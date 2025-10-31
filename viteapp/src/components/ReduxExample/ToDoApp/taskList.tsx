import { deleteTodo } from "./actions";
import { useAppDispatch, useAppSelector } from "../hooks";

const TaskList = () => {
  const tasks = useAppSelector((state) => state.todo.tasks);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="tasklist">
      <div className="display-tasks">
        <h5>Your tasks:</h5>
        <ul className="tasks">
          {tasks.map((task) => (
            <li className="task" key={task.id}>
              {task.text}
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

export default TaskList;
