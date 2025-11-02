const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "goToNextPage":
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case "goToPrevPage":
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case "goToSpecificPage":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
