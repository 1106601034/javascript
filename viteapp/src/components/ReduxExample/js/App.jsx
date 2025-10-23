// App.jsx
import { Provider } from "react-redux";
import Example from "./Example";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Counter Using useSelector</h1>
        <Example />
      </div>
    </Provider>
  );
}

export default App;
