// Identifies this module as containing counter action definitions.
export const INCREMENT = "counter/increment" as const;
// Identifies the action type string for decrement operations while preserving literal typing.
export const DECREMENT = "counter/decrement" as const;

// Describes the shape of increment actions consumed by the reducer.
export type IncrementAction = {
  // Specifies that increment actions carry only the INCREMENT type flag.
  type: typeof INCREMENT;
};

// Describes the shape of decrement actions consumed by the reducer.
export type DecrementAction = {
  // Specifies that decrement actions carry only the DECREMENT type flag.
  type: typeof DECREMENT;
};

// Produces a typed increment action object for dispatch.
export const increment = (): IncrementAction => ({
  // Populates the action type using the increment constant.
  type: INCREMENT,
});

// Produces a typed decrement action object for dispatch.
export const decrement = (): DecrementAction => ({
  // Populates the action type using the decrement constant.
  type: DECREMENT,
});
