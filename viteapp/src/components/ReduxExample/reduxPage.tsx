import React from "react";
import Counter from "./Counter/counter";
import Task from "./ToDoApp/task";
import TaskList from "./ToDoApp/taskList";

const ReduxPage = () => {
  return (
    <div className="new-redux-project">
      <section>
        <h2>Counter</h2>
        <Counter />
      </section>
      <section>
        <h2>Tasks</h2>
        <Task />
        <TaskList />
      </section>
    </div>
  );
};

export default ReduxPage;
