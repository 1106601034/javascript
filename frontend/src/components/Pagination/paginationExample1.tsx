// import { useState } from "react";
import { data } from "./data.ts";
import {
  goToNextPage,
  goToPrevPage,
  goToSpecificPage,
  updateItemsPerPage,
} from "./actions.tsx";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.ts";

export default function PaginationExample1() {
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const itemsPerPage = useAppSelector((state) => state.pagination.itemsPerPage);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return (
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }

  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    dispatch(goToNextPage());
  };

  const handlePrevPage = () => {
    dispatch(goToPrevPage());
  };

  const handleSpecificPage = (pageNumber) => {
    dispatch(goToSpecificPage(pageNumber));
  };

  const handleItemsPerPage = (pageNumber) => {
    dispatch(updateItemsPerPage(pageNumber));
  };

  function renderPaginationControls() {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handleSpecificPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        Display
        <button onClick={() => handleItemsPerPage(2)}>Item per page.</button>
      </div>
    );
  }

  return (
    <div>
      {renderData()}
      {renderPaginationControls()}
    </div>
  );
}
