import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/ReduxExample/store";
import NavBarExample from "./components/nav-bar/nav-bar-example-1";
import Footer from "./components/footer/Footers";
import NotFound from "./components/404-not-found/404-not-found";
import ReduxExampleTSX from "./components/ReduxExample/example";
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
                <Route path="/App1" element={<ReduxExampleTSX />} />
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
