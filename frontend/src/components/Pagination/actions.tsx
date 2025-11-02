const goToNextPage = () => {
  return { type: "goToNextPage" };
};
const goToPrevPage = () => {
  return { type: "goToPrevPage" };
};
const goToSpecificPage = (page) => {
  return { type: "goToSpecificPage", payload: page };
};
const updateItemsPerPage = (page) => {
  return { type: "updateItemsPerPage", payload: page };
};

export { goToNextPage, goToPrevPage, goToSpecificPage, updateItemsPerPage };
