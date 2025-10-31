// actions.ts
// Notes the file origin for clarity when bundlers rewrite paths.
export const INCREMENT = "counter/increment" as const;
export const DECREMENT = "counter/decrement" as const;
// Declares a namespaced action type string and freezes it as a literal type.

export type IncrementAction = {
  type: typeof INCREMENT;
};
// Defines the shape of the increment action object with a single type field.

export type DecrementAction = {
  type: typeof DECREMENT;
};

export const increment = (): IncrementAction => ({
  type: INCREMENT,
});
// Creates the increment action creator returning the standardized action payload.

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
});