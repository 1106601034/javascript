import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavBarExample from "./components/nav-bar/nav-bar-example-1";
import Footer from "./components/footer/Footers";
import NotFound from "./components/404-not-found/404-not-found";
import Task from "./components/ToDoApp/task";
import TaskList from "./components/ToDoApp/taskList";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div data-bs-theme="light">
        <Router>
          <NavBarExample />
          <div className="container-fluid">
            <div className="main-area">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <Task />
                      <TaskList />
                    </div>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
