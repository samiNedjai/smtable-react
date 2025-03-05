import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Table.css";

const Table = ({ columns, data, pageSizeOptions }) => {
  const [sorting, setSorting] = useState({ column: null, order: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0] || 5);



  // Tri des données
  const sortedData = [...data].sort((a, b) => {
    if (!sorting.column) return 0;
    const valA = a[sorting.column];
    const valB = b[sorting.column];
    if (valA < valB) return sorting.order === "asc" ? -1 : 1;
    if (valA > valB) return sorting.order === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Gestion du tri
  const handleSort = (column) => {
    setSorting({
      column,
      order: sorting.column === column && sorting.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="table-container">
      {/* Sélecteur de taille de page */}
      <div className="table-header">
        <label>
          Show 
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          entries
        </label>
      </div>

      {/* Tableau */}
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map(({ id, label }) => (
              <th key={id} onClick={() => handleSort(id)}>
                {label} {sorting.column === id ? (sorting.order === "asc" ? "🔼" : "🔽") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map(({ id }) => (
                  <td key={id}>{row[id]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
};

Table.defaultProps = {
  pageSizeOptions: [5, 10, 20],
};

export default Table;
