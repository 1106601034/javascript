// store.ts
// Implements the Redux store configuration for the example counter.
import { configureStore } from "@reduxjs/toolkit";
// Imports Redux Toolkit's helper to set up the store with sensible defaults.
import rootReducer from "./rootReducer";
// Pulls in the root reducer defined for the counter state.
const store = configureStore({
  reducer: rootReducer,
});
// Creates the Redux store instance using the counter reducer.

export type RootState = ReturnType<typeof store.getState>;
// Infers the full state shape for useSelector typings.
export type AppDispatch = typeof store.dispatch;
// Extracts the dispatch type for typed useDispatch usage.

export default store;
// Exports the configured store for provider setup.
