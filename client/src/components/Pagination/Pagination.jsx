import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Pagination.scss";

function Pagination({ currentPage, totalPages }) {
  const TOTAL_PAGE_NUMBER_BOXES = 5;
  const navigate = useNavigate();

  return (
    <div className="pagination">
      <ul>
        <li className={currentPage === 1 ? "none" : ""}>
          <span
            onClick={() => navigate(`/list?page=${currentPage - 1}`)}
          >{`<`}</span>
        </li>
        {[...Array(Math.min(TOTAL_PAGE_NUMBER_BOXES, totalPages))].map(
          (_, index) => {
            const pageNumber = index + 1;
            return (
              <li
                key={index}
                onClick={() => navigate(`/list?page=${pageNumber}`)}
                className={pageNumber === currentPage ? "active" : ""}
              >
                <span>{pageNumber}</span>
              </li>
            );
          }
        )}

        <li className={currentPage >= totalPages ? "none" : ""}>
          <span
            onClick={() => navigate(`/list?page=${currentPage + 1}`)}
          >{`>`}</span>
        </li>
      </ul>
      <span>Total: {totalPages} pages</span>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
