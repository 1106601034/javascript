// Imports the Redux Toolkit helper that creates a configured store.
import { configureStore } from "@reduxjs/toolkit";
// Imports the todo root reducer that handles all todo actions.
import RootReducer from "./rootReducer";

// Configures a dedicated store instance for the todo example.
const store = configureStore({
  // Registers the todo reducer to process dispatched todo actions.
  reducer: RootReducer,
});

// Infers the structure of the todo store's state tree.
export type RootState = ReturnType<typeof store.getState>;
// Infers the signature of the dispatch function exposed by the store.
export type AppDispatch = typeof store.dispatch;

// Exports the configured store so components can access todo state.
export default store;
