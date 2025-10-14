import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.scss";

import NavBarExample from "./components/nav-bar/nav-bar-example-1";
import Footer from "./components/footer/Footers";
import Calculater from "./components/Calculater";

function App() {
  console.clear();
  return (
    <div data-bs-theme="dark">
      <Router>
        <NavBarExample />
        <div className="container-fluid">
          <div className="main-area">
            <Routes>
              <Route path="/Calculater" element={<Calculater />}></Route>
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
