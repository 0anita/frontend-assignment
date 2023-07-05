import React from 'react';

const Search = ({ search, products }) => {
  const filteredProducts = products?.filter((product) => {
    const lowerCaseTitle = product.title.toLowerCase();
    const lowerCaseSearch = search?.toLowerCase()?.trim();
    console.log('lowerCaseTitle:', lowerCaseTitle);
    console.log('lowerCaseSearch:', lowerCaseSearch);
    return lowerCaseTitle.includes(lowerCaseSearch);
  });



  return (
    <div>
      <h2>Search Results</h2>
      {filteredProducts?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredProducts?.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
