import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.scss";

import NavBarExample from "./components/nav-bar/nav-bar-example-1";
import Footer from "./components/footer/Footers";
import NotFound from "./components/404-not-found/404-not-found";

function App() {
  return (
    <div data-bs-theme="light">
      <Router>
        <NavBarExample />
        <div className="container-fluid">
          <div className="main-area">
            <Routes>
              {/* <Route path="/Calculater" element={<Calculater />}>
                <Route path="Calculater" element={<Calculater />}></Route>
              </Route> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
