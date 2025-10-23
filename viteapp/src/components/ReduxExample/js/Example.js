// Example.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../actions/actions";

const ReduxExampleJS = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

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

export default ReduxExampleJS;
