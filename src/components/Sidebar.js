import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../contexts/SearchContext';

const Sidebar = ({ data }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    setSelectedCategory(category);
  };

  const handleAllCategoryClick = () => {
    setCategoryData(null);
    setSelectedCategory(null);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1 className='text-2xl
      text-color-primary text-center md:text-left xl:w-32  md:px-14
      md:pt-10
      font-bold py-5'>
        Choose A Category
      </h1>
      <div className='items-start justify-start grid xl:block sm:grid-cols-3 grid-cols-2 xl:pt-3 md:px-7'>
        <button
          className={`capitalize px-7  w-full text-left hover:text-color-secondary duration-200 ${!selectedCategory ? 'font-bold' : ''
            }`}
          onClick={handleAllCategoryClick}
        >
          All Category
        </button>
        {uniqueCategories.map((category) => (
          <button
            className={`capitalize px-7  w-full text-left hover:text-color-secondary duration-200 ${selectedCategory === category ? 'font-bold' : ''
              }`}
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
