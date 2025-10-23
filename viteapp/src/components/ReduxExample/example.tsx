// Example.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions";
import type { AppDispatch, RootState } from "./store";

const ReduxExampleTSX: React.FC = () => {
  const counter = useSelector<RootState, number>((state) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default ReduxExampleTSX;
