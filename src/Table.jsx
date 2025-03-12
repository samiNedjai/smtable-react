import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Table.css";

/**
 * Composant Table : Affiche un tableau interactif avec tri, pagination et recherche.
 *
 * @param {Array} columns - Définition des colonnes (id et label).
 * @param {Array} data - Données à afficher dans le tableau.
 * @param {Array} pageSizeOptions - Options de taille de page pour la pagination.
 * @param {String} emptyMessage - Message affiché lorsque le tableau est vide.
 */

const Table = ({ columns, data, pageSizeOptions, emptyMessage }) => {
    // États pour la gestion du tri, pagination et recherche
  const [sorting, setSorting] = useState({ column: null, order: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0] || 5);
  const [searchTerm, setSearchTerm] = useState("");

   /**
   * Tri des données selon la colonne sélectionnée.
   */
  const sortedData = [...data].sort((a, b) => {
    if (!sorting.column) return 0;
    const valA = a[sorting.column];
    const valB = b[sorting.column];
    if (valA < valB) return sorting.order === "asc" ? -1 : 1;
    if (valA > valB) return sorting.order === "asc" ? 1 : -1;
    return 0;
  });
 
  
  /**
   * Filtrage des données en fonction du terme recherché.
   */
  const filteredData = sortedData.filter((row) =>
    columns.some(({ id }) =>
      row[id]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

    /**
   * Gestion de la pagination.
   */
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  
  /**
   * Calcul des indices d'affichage pour l'info pagination.
   */
  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min((currentPage + 1) * pageSize, filteredData.length);
  
  /**
   * Fonction de gestion du tri sur une colonne donnée.
   */
  const handleSort = (column) => {
    setSorting({
      column,
      order:
        sorting.column === column && sorting.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="table-container">
            {/* Barre supérieure avec sélection de la taille de page et barre de recherche */}
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
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
        </label>
      </div>

            {/* Tableau des données */}

      <table className="custom-table">
        <thead>
          <tr>
            {columns.map(({ id, label }) => (
              <th key={id} onClick={() => handleSort(id)}>
                {label}{" "}
                {sorting.column === id
                  ? sorting.order === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
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
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>

           {/* Footer du tableau : Infos pagination et navigation */}

      <div className="pagination_container">
        <div className="entries-info">
          Showing{" "}
          {filteredData.length > 0
            ? `${startIndex} to ${endIndex} of ${filteredData.length}`
            : "0"}{" "}
          entries
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Définition des PropTypes pour sécuriser les props du composant

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  emptyMessage: PropTypes.string,
};

// Valeurs par défaut pour certaines props

Table.defaultProps = {
  pageSizeOptions: [5, 10, 20],
  emptyMessage: "No data available",
};

export default Table;
