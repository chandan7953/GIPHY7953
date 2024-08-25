import React, { useState } from "react";
import GifItem from "./GifItem";
import Pagination from "./Pagination";

const GifGrid = ({ gifs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGifs = gifs.slice(startIndex, endIndex);

  const totalPages = Math.ceil(gifs.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (gifs.length === 0) {
    return (
      <p className="text-center">No GIFs found. Try searching for something!</p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedGifs.map((gif) => (
          <GifItem key={gif.id} gif={gif} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GifGrid;
