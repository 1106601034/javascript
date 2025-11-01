// Imports the Redux Toolkit helper that builds a store with good defaults.
import { configureStore } from "@reduxjs/toolkit";
// Imports the counter reducer that will respond to dispatched counter actions.
import rootReducer from "./rootReducer";

// Configures a standalone store instance dedicated to the counter demo.
const store = configureStore({
  // Registers the counter reducer as the store's root reducer.
  reducer: rootReducer,
});

// Infers the shape of the state returned by the counter store.
export type RootState = ReturnType<typeof store.getState>;
// Infers the dispatch function signature exposed by the counter store.
export type AppDispatch = typeof store.dispatch;

// Exports the configured store so components can inject it via a provider if needed.
export default store;
