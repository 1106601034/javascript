import "./App.scss"
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBarExample from "./components/nav-bar/nav-bar-example-1";

function App() {
  console.clear();
  return (
    <div className='main'>
      <NavBarExample />
    </div>
  )
}

export default App