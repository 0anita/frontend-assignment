import React, { useContext } from 'react';
import ViewProducts from '../components/ViewProducts';
import { SearchContext } from '../contexts/SearchContext';

const SearchResults = ({ data }) => {
  const { filteredData } = useContext(SearchContext);

  return (
    <ViewProducts sdata={filteredData} data={data} isLoading={false} />
  );
};

export default SearchResults;
