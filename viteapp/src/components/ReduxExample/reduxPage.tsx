import React from "react";
import Task from "./ToDoApp/task";
import TaskList from "./ToDoApp/taskList";

const reduxPage = () => {
  return (
    <div>
      <Task />
      <TaskList />
    </div>
  );
};

export default reduxPage;
