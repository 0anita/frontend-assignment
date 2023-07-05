import React, { useEffect, useState } from 'react';

const Sidebar = ({ data }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    if (data) {
      const categoriesSet = new Set();
      data.forEach((item) => {
        categoriesSet.add(item.category);
      });
      setUniqueCategories(Array.from(categoriesSet));
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
        <h1 className='text-2xl text-center md:text-left md:px-14  md:pt-10 font-bold py-5'>Choose A Category</h1>
      <div className='flex flex-col px-28 md:block md:pt-7 md:px-7'>
        {uniqueCategories.map((category) => (
          <button
            className='capitalize px-7 my-3 w-full text-left hover:text-red-500 duration-200'
            key={category}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
