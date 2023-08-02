import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onChange,
  onItemsPerPageChange,
}) => {
  import("../../styles/CustomPagination.css");
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    const generateDisplayedPages = () => {
      let displayedPages = [];

      if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
          displayedPages.push(i);
        }
      } else {
        if (currentPage <= 5) {
          displayedPages = [1, 2, 3, 4, 5, "ellipsis", totalPages];
        } else if (currentPage >= totalPages - 2) {
          displayedPages = [
            1,
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ];
        } else {
          displayedPages = [
            1,
            "ellipsis",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "ellipsis",
            totalPages,
          ];
        }
      }

      setDisplayedPages(displayedPages);
    };

    generateDisplayedPages();
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onChange(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    onItemsPerPageChange(selectedItemsPerPage);
  };

  return (
    <Row aria-label="Page navigation">
      <Col className="text-center mt-2 col-lg-4 d-flex flex-row">
        <label htmlFor="rowsPerPage" className="p-2">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          className="form-select"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </Col>
      <Col className="text-center mt-2 col-lg-4">
        {startIndex}-{endIndex} of {totalItems}
      </Col>
      <Col className="col-lg-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img
                src={
                  currentPage === 1
                    ? "/images/arrow_left_disabled.svg"
                    : "/images/arrow_left_active.svg"
                }
                className="img-fluid"
                alt="left arrow"
              />
            </button>
          </li>
          {displayedPages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <li key={index} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              );
            }
            return (
              <li
                key={index}
                className={`page-item${page === currentPage ? " active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li
            className={`page-item${
              currentPage === totalPages ? " disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <img
                src={
                  currentPage === totalPages
                    ? "/images/arrow_right_disabled.svg"
                    : "/images/arrow_right_active.svg"
                }
                className="img-fluid"
                alt="right arrow"
              />
            </button>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default CustomPagination;
