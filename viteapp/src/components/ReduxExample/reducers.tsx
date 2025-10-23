// reducers.ts
import type { Reducer } from "@reduxjs/toolkit";
import { INCREMENT } from "./actions";

export type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0,
};

const rootReducer: Reducer<CounterState> = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};

export default rootReducer;
