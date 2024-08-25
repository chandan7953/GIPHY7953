import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-[#3A244A] hover:bg-gray-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 border border-gray-300 ${
            currentPage === index + 1 ? "bg-[#3A244A] text-white" : "bg-white"
          } hover:bg-gray-50`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text[#3A244A] hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
