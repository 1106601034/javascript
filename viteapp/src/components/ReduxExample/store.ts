import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Counter/rootReducer";
import todoReducer from "./ToDoApp/rootReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
