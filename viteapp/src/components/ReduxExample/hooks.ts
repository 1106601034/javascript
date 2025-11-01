// Imports typed React-Redux helpers to customize selector and dispatch hooks.
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Imports the store's dispatch and state types for type-safe bindings.
import type { AppDispatch, RootState } from "./store";

// Exposes a dispatch hook that is aware of the AppDispatch signature.
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Exposes a selector hook that is aware of the RootState structure.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
