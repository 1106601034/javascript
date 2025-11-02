// Imports typed React-Redux helpers to customize selector and dispatch hooks.
// usedispatch is a hook to access the dispatch function from the store.
// useselector is a hook to access the state.
// TypedUseSelectorHook is a type that helps define the shape of the state for useSelector.
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// AppDispatch is the type of the dispatch function for the Redux store.
// RootState is what the data in the store looks like.
import type { AppDispatch, RootState } from "./store";

// Exposes a dispatch hook that is aware of the AppDispatch signature.
// when other parts of the app call it, they get the store’s “send a message” function with the right shape, which keeps the app from sending anything it shouldn’t.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Exposes a selector hook that is aware of the RootState structure.
// It lets other parts of the app safely read data from the store, with TypeScript guiding them to the right pieces of information.
// RootState describes “what the data in the store looks like.”
// TypedUseSelectorHook<RootState> describes “a function that knows how to read that data safely.”
// call useAppSelector then you read the store, useAppSelector type must be the function-shaped one.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
