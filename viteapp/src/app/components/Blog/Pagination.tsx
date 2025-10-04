interface IPagination {
    postsPerPage: number;
    currentPage: number;
    totalPosts: number;
    paginate: (pageNumber: number) => void;
    goToPrevPage: () => void;
    goToNextPage: () => void;
}

export default function Pagination({ postsPerPage, currentPage, paginate, totalPosts, goToPrevPage, goToNextPage }: IPagination) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    {currentPage !== 1 && <button className="btn btn-light" onClick={goToPrevPage}>Previous</button>}
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#"
                            className={
                                `page-link ${currentPage === number ? 'active-page' : ''}`
                            }>
                            {number}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    {currentPage !== pageNumbers.length && <button className="btn btn-light" onClick={goToNextPage}>Next</button>}
                </li>
            </ul>
        </nav>
    );
}