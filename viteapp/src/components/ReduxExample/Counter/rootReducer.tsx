// imports the Reducer type from Redux Toolkit so TypeScript knows this function has the right reducer shape.
import type { Reducer } from "@reduxjs/toolkit";

// brings in the INCREMENT and DECREMENT action type names the reducer will look for.
import { INCREMENT, DECREMENT } from "./actions";

// Declares the portion of Redux state that this reducer manages.
// starts a TypeScript type that describes this slice of state is just a single counter number.
export type CounterState = {
  // defines the counter field in that state and notes it stores a number.
  counter: number;
};

// Establishes the default counter state before any actions fire.
const initialState: CounterState = {
  // Sets the starting count to zero.
  counter: 0,
};

// creates the reducer function, telling TypeScript it matches the Reducer<CounterState> signature.
// the variable named rootReducer must be a Redux reducer function whose state object looks like CounterState.
// The function accepts a CounterState and an action, and returns a new CounterState.
// also sets state to initialState whenever Redux calls it with an undefined state (which happens on first run).
const rootReducer: Reducer<CounterState> = (state = initialState, action) => {
  // receives every dispatched action and decides how to update the counter.
  // code can react differently depending on action.type.
  switch (action.type) {
    // checks whether the action was an increment.
    case INCREMENT:
      return {
        // returns a new state object, copying the old state and increasing counter by one.
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
