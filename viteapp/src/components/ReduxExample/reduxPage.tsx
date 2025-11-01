// Imports the Counter component that demonstrates Redux-powered counting.
import Counter from "./Counter/counter";
// Imports the form component used to add tasks into the Redux todo slice.
import Task from "./ToDoApp/task";
// Imports the listing component that renders tasks from the Redux store.
import TaskList from "./ToDoApp/taskList";

// Declares the page component that showcases the Redux examples.
const ReduxPage = () => {
  // Returns the JSX structure rendered by the page.
  return (
    // Wraps the demo sections in a simple container.
    <div>
      {/* Marks the area dedicated to the counter demo. */}
      <section>
        {/* Labels the counter section for readers. */}
        <h2>Counter</h2>
        {/* Renders the Redux counter example component. */}
        <Counter />
      </section>
      {/* Marks the area dedicated to the todo demo. */}
      <section>
        {/* Labels the tasks section for readers. */}
        <h2>Tasks</h2>
        {/* Renders the task creator tied to the Redux todo slice. */}
        <Task />
        {/* Renders the list of tasks stored in Redux. */}
        <TaskList />
      </section>
    </div>
  );
};

// Exports the ReduxPage component as the default export for routing.
export default ReduxPage;
