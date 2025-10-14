import React from "react";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import NavBarExample from "../components/nav-bar/nav-bar-example-1";
import Footer from "../components/footer/Footers";


function App() {
  console.clear();
  return (
    <div data-bs-theme="dark">
      <NavBarExample />
      <div className="container"></div>
      <Footer />
    </div>
  );
}

export default App;
