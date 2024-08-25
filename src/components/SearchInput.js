import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-5">
      <form className="flex p-2 w-full max-w-[600px]" onSubmit={handleSubmit}>
        <input
          type="text"
          className="block w-full border-0 px-4 py-2 flex-1 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search GIFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#D72638] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-r-md transition-colors duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
