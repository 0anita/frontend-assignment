import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState(null)

  return (
    <SearchContext.Provider value={{ filteredData, setFilteredData, categoryData, setCategoryData }}>
      {children}
    </SearchContext.Provider>
  );
};