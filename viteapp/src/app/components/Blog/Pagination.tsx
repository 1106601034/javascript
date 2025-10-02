export default function Pagination({
    postsPerPage,
    currentPage,
    paginate,
    totalPosts,
}: {
    postsPerPage: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
    totalPosts: number;
}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
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
            </ul>
        </nav>
    );
}