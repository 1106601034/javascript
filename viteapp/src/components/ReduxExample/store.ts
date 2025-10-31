import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Counter/rootReducer";
import todoReducer from "./ToDoApp/rootReducer";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
