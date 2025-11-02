// Imports React so the component can use JSX syntax.
import React from "react";
// Imports the increment and decrement action creators for dispatching updates.
import { increment, decrement } from "./actions";
// Imports the typed Redux hooks so the component can read from the store and send updates back.
import { useAppDispatch, useAppSelector } from "../hooks";

// Defines the counter demonstration component with React.FC typing.
const ReduxExampleTSX: React.FC = () => {
  // Reads the current counter value from the Redux store.
  const counter = useAppSelector((state) => state.counter.counter);
  // Retrieves the store dispatch function with proper typing.
  const dispatch = useAppDispatch();

  // Handles increment button clicks by dispatching the increment action.
  const handleIncrement = () => {
    // Dispatches the increment action to update the counter state.
    dispatch(increment());
  };

  // Handles decrement button clicks by dispatching the decrement action.
  const handleDecrement = () => {
    // Dispatches the decrement action to update the counter state.
    dispatch(decrement());
  };

  // Renders the counter value and the control buttons.
  return (
    // Wraps the counter UI in a simple container element.
    <div>
      {/* Displays the current counter value from Redux state. */}
      <p>Counter: {counter}</p>
      {/* Binds the increment handler to raise the counter when clicked. */}
      <button onClick={handleIncrement}>Increment</button>
      {/* Binds the decrement handler to lower the counter when clicked. */}
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

// Exports the ReduxExampleTSX component so other modules can render it.
export default ReduxExampleTSX;
