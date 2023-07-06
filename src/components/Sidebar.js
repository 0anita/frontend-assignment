import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const Sidebar = ({ data }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const { setCategoryData } = useContext(SearchContext);

  useEffect(() => {
    if (data) {
      const categoriesSet = new Set();
      data.forEach((item) => {
        categoriesSet.add(item.category);
      });
      setUniqueCategories(Array.from(categoriesSet));
    }
  }, [data]);

  const handleCategoryClick = (category) => {
    setCategoryData(category.toLowerCase());
  };

  const handleAllCategoryClick = () => {
    setCategoryData(null);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <h1 className='text-2xl text-center md:text-left md:px-14 md:pt-10 font-bold py-5'>
        Choose A Category
      </h1>
      <div className='flex flex-row xl:flex-col xl:items-start px-28 md:block md:pt-7 md:px-7'>
        <button
          className='capitalize px-7 my-3 w-full text-left hover:text-red-500 duration-200'
          onClick={handleAllCategoryClick}
        >
          All Category
        </button>
        {uniqueCategories.map((category) => (
          <button
            className='capitalize px-7 my-3 w-full text-left hover:text-red-500 duration-200'
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
