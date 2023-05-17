

function CustomPagination({ totalItems, itemsPerPage, currentPage, onChange, onItemsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onChange(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    onItemsPerPageChange(selectedItemsPerPage);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item${i === currentPage ? ' active' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {generatePageNumbers()}
        <li
          className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
      <div className="text-center mt-2">
        Showing {startIndex}-{endIndex} of {totalItems}
      </div>
      <div className="text-center mt-2">
        <label htmlFor="rowsPerPage">Rows per page:</label>
        <select
          id="rowsPerPage"
          className="form-control"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={totalItems}>All</option>
        </select>
      </div>
    </nav>
  );
}

export default CustomPagination;