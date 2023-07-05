import React from 'react';
import Search from '../components/Search';

const SearchResults = ({ data, search }) => {
  console.log(search)

  return (
    <div>
      <h1>Search Results</h1>
      <Search search={search} products={data} />
    </div>
  );
};

export default SearchResults;
