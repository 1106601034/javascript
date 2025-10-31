// reducers.ts
// Provides the root reducer logic for the counter example.
import type { Reducer } from "@reduxjs/toolkit";
// Imports the Reducer type to give the root reducer precise typing.
import { INCREMENT, DECREMENT } from "./Counter/actions";
// Pulls in the increment action constant for switch matching.

export type CounterState = {
  counter: number;
};
// Declares the portion of state managed by this reducer.

const initialState: CounterState = {
  counter: 0,
};
// Sets the counter baseline to zero for the initial Redux store state.

const rootReducer: Reducer<CounterState> = (state = initialState, action) => {
  // Defines the root reducer handling counter actions with a default state.
  switch (action.type) {
    // Branches on the action type to update state.
    case INCREMENT:
      // Handles the increment action by producing a new state.
      return {
        ...state,
        // Retains other properties in the state object.
        counter: state.counter + 1,
        // Increments the counter property immutably.
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
    // Returns the current state for unhandled actions.
  }
};

export default rootReducer;
// Exports the reducer for store configuration.
