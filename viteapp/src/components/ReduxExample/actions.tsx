// actions.ts
export const INCREMENT = "counter/increment" as const;

export type IncrementAction = {
  type: typeof INCREMENT;
};

export const increment = (): IncrementAction => ({
  type: INCREMENT,
});
