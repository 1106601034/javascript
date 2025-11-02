const goToNextPage = () => {
  return { type: "goToNextPage" };
};
const goToPrevPage = () => {
  return { type: "goToPrevPage" };
};
const goToSpecificPage = (page) => {
  return { type: "goToSpecificPage", payload: page };
};

export { goToNextPage, goToPrevPage, goToSpecificPage };
