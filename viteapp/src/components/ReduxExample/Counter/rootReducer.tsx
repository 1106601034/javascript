// Imports the Reducer type so the reducer signature stays explicit.
import type { Reducer } from "@reduxjs/toolkit";
// Imports the defined counter action type constants for switch matching.
import { INCREMENT, DECREMENT } from "./actions";

// Declares the portion of Redux state that this reducer manages.
export type CounterState = {
  // Tracks the numeric count value displayed in the UI.
  counter: number;
};

// Establishes the default counter state before any actions fire.
const initialState: CounterState = {
  // Sets the starting count to zero.
  counter: 0,
};

// Implements the reducer function that reacts to counter actions.
const rootReducer: Reducer<CounterState> = (state = initialState, action) => {
  // Selects logic based on the incoming action type.
  switch (action.type) {
    // Handles increment actions by adding one to the counter.
    case INCREMENT:
      return {
        // Keeps any other state fields unchanged.
        ...state,
        // Updates the counter property immutably with the incremented value.
        counter: state.counter + 1,
      };
    // Handles decrement actions by subtracting one from the counter.
    case DECREMENT:
      return {
        // Keeps any other state fields unchanged.
        ...state,
        // Updates the counter property immutably with the decremented value.
        counter: state.counter - 1,
      };
    // Returns the existing state for all other action types.
    default:
      return state;
  }
};

// Exports the reducer so the Redux store can register it under the counter slice.
export default rootReducer;
