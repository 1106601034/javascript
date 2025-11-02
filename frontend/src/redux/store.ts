// Pulls in Redux Toolkit helpers for composing reducers and configuring the store.
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Imports the counter slice reducer that manages numeric state.
import counterReducer from "../components/Counter/reducers";
// Imports the todo slice reducer that manages task collections.
import todoReducer from "../components/ToDoApp/reducers";
import paginationReducer from "../components/Pagination/reducers";

// Combines the feature reducers into a single root reducer map.
const rootReducer = combineReducers({
  // Defines the counter slice under the `counter` key.
  counter: counterReducer,
  // Defines the todo slice under the `todo` key.
  todo: todoReducer,
  pagination: paginationReducer,
});

// Creates the Redux store instance configured with the root reducer.
const store = configureStore({
  // Supplies the reducer map used to respond to dispatched actions.
  reducer: rootReducer,
});

// Infers the overall Redux state shape for typed selectors.
export type RootState = ReturnType<typeof rootReducer>;
// Infers the dispatch signature for typed dispatch hooks.
export type AppDispatch = typeof store.dispatch;

// Exports the preconfigured store so <Provider> can supply it.
export default store;
