import React, { useState } from "react";

const PagTable = ({ results }) => { //table for formatting and displaying the results, used in Parent.js
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  //get page total
  const totalPages = Math.ceil(results.length / resultsPerPage);

  //results for current page
  const currentResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleNextPage = () => { //state change to next page
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 style={{fontFamily:"Shippori Antique B1, sans-serif", fontSize: "20px"}}>Here's What We Found: </h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((results, index) => (
            <tr key={index} style={{fontFamily:"Shippori Antique B1, sans-serif", fontSize: "14px"}}>
              <td>{results.Number}</td>
              <td>{results.Description}</td>
              <td>{results.Category}</td>
              <td>{results.Status}</td>
              <td>{results.DateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button
        className="buttons"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span style={{fontFamily:"Shippori Antique B1, sans-serif", fontSize: "14px"}}>
          Page {currentPage} of {totalPages}
        </span>
        <button
        className="buttons"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PagTable;
