import { useState } from "react";
import { data } from "./data.ts";

export default function PaginationExample1() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  function goToNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function goToPrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function goToSpecificPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function renderPaginationControls() {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
      <div>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => goToSpecificPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
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
