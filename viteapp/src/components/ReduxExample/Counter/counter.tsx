// Example.tsx
// Provides a simple typed React + Redux counter example component.
import React from "react";
// Pulls in React to define the functional component.
import { useSelector, useDispatch } from "react-redux";
// Imports Redux hooks to read state and dispatch actions.
import { increment, decrement } from "./actions";
// Brings in the increment action creator to trigger state updates.
import type { AppDispatch, RootState } from "../store";
// Imports the typed dispatch and root state definitions for proper inference.

const ReduxExampleTSX: React.FC = () => {
  // Declares the functional component typed as a React.FC.
  const counter = useSelector<RootState, number>((state) => state.counter);
  // Subscribes to the counter slice from the Redux store with type safety.
  const dispatch = useDispatch<AppDispatch>();
  // Retrieves the store dispatch function with the AppDispatch type.

  const handleIncrement = () => {
    // Defines a click handler that increments the counter.
    dispatch(increment());
    // Dispatches the increment action to the Redux store.
  };

  const handleDecrement = () => {
    // Defines a click handler that increments the counter.
    dispatch(decrement());
    // Dispatches the increment action to the Redux store.
  };

  return (
    // Renders the UI showing the counter value and increment button.
    <div>
      <p>Counter: {counter}</p>
      {/* Displays the current counter state value. */}
      <button onClick={handleIncrement}>Increment</button>
      {/* Triggers the increment action when clicked. */}
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default ReduxExampleTSX;
// Exports the counter example component as default.
