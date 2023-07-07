import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useFormik } from 'formik';
import { HiSearch } from 'react-icons/hi';
import { SearchContext } from '../contexts/SearchContext';
import SearchResults from '../pages/SearchResults';
import ViewProducts from './ViewProducts';

const Header = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { filteredData, setFilteredData } = useContext(SearchContext);

  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (val, { resetForm }) => {
      setSearchValue(val.search);
      nav(`/searchResults/${val.search}`);
      resetForm();
    },
  });

  useEffect(() => {
    const filtered = data?.filter((item) => {
      const title = item.title.toLowerCase();
      const isMatch = title.includes(searchValue.toLowerCase());

      if (searchValue.toLowerCase() === 'men' && title.includes('woman')) {
        return false; // Exclude items containing "woman" if searchValue is "men"
      }

      return isMatch;
    });

    setFilteredData(filtered);
  }, [searchValue, data, setFilteredData]);


  const navs = [

    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Go to Cart',
      path: '/cart/',
    },
  ];

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();

  return (
    <div className='bg-slate-800'>
      {/* OnlineStore with menu toggle on small screen and full on big screen*/}
      <div className='p-5 flex duration-200 md:scale-100 scale-125  md:justify-between items-baseline md:items-center md:gap-6 gap-0 justify-center mx-10 xl:mx-40 '>
        <div>
          <NavLink to='/' className='text-4xl font-bold text-color-tertiary duration-300 hover:duration-300 hover:text-custom-black'>OnlineStore</NavLink>
        </div>


        {/* nav button menu*/}

        <div>
          <button
            onClick={toggle}
            className='px-7 hover:scale-110 md:hidden text-white duration-300'
          >
            {isOpen ? (
              <RxCross2 size={30} className='hover:bg-slate-400 my-1' />
            ) : (
              <IoMenu size={30} />
            )}
          </button>



        </div>




        {/* big navbar  */}
        <div className='xl:grid md:flex xl:w-96 grid-cols-2 hidden gap-10  text-xl justify-end'>
          {navs.map(nav => (
            <NavLink
              to={nav.path}
              key={nav.name}
              className={`hover:font-bold hover:text-slate-600 duration-100 ${location.pathname === nav.path ? 'text-color-tertiary font-bold' : ' text-white'} `}
            >
              {nav.name}
            </NavLink>
          ))}

        </div>
      </div>


      {/* small navbar OPEN */}
      {isOpen && (
        <div className='flex flex-col space-y-5 m-5 duration-200 text-center  pb-10 md:hidden'>
          {navs.map(nav => (
            <NavLink
              to={nav.path}
              key={nav.name}
              className={`hover:font-bold hover:text-slate-600 duration-100 ${location.pathname === nav.path ? 'text-color-tertiary font-bold' : ' text-white'} `}
            >
              {nav.name}
            </NavLink>
          ))}

          {/* search bar  toggled small */}
          <form
            className='flex justify-center items-center w-full'
            onSubmit={formik.handleSubmit}>
            <label htmlFor="search"></label>
            <div className='max-w-lg md:w-3/5 flex'>
              <input
                type="text"
                name='search'
                value={formik.values.search}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.placeholder = ""}
                onBlur={(e) => e.target.placeholder = 'Search products'}
                placeholder='Search products'
                className='w-full outline-none border rounded-l-lg text-center py-1 text-custom-black'
              />
              <button
                type='submit'
                className='bg-color-primary hover:bg-color-secondary font-bold py-2 px-4 rounded-r-lg'
              >
                <HiSearch size={30} className='' />
              </button>
            </div>
          </form>

        </div>
      )}

      {/* hero banner for small screen */}
      <div className='bg-custom-small-banner bg-contain py-52 bg-no-repeat text-center bg-right backdrop-blur-lg flex items-center justify-center md:hidden'>


        <div className=''>
          {/* search bar  small screen */}
          <form
            className=' rounded-md  justify-center items-center  py-2 w-full backdrop-blur-sm'
            onSubmit={formik.handleSubmit}>

            <label
              className=''
              htmlFor="search">
              <p className='text-3xl text-white'>Happy Shopping with </p>
              <p className='text-6xl font-bold text-color-primary'>OnlineStore</p>

            </label>
            <div className='max-w-lg  xl:w-96 lg:w-80 md:w-72 pt-8   flex'>
              <input
                type="text"
                name='search'
                value={formik.values.search}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.placeholder = ""}
                onBlur={(e) => e.target.placeholder = 'Search products'}
                placeholder='Search products'
                className='w-full outline-none border rounded-l-lg text-center py-0 text-custom-black'
              />
              <button
                type='submit'
                className='bg-color-primary hover:bg-color-secondary   font-bold py-0 px-4 rounded-r-lg'
              >
                <HiSearch size={30} className='' />
              </button>


            </div>

          </form>
          <div className='flex  text-white py-5'>
            <div className='bg-black bg-opacity-5 p-2 backdrop-blur-sm'>
              <p className=''>Explore a vast selection of products. Easy Returns.
                <br />
                Buy Now! Top brands for Phones and Electronics.
              </p>
              <p>
                Latest trends in Fashion.
              </p>
              <p className='text-color-tertiary text-sm flex justify-center py-2 '>with Free Shipping available*
              </p>
            </div>
          </div>

        </div>
      </div>



      {/* hero banner for big */}
      <div className='bg-custom-big-banner b'>
        <div className='xl:p-52 
          lg:p-44 md:p-28 hidden items-center md:flex overflow-hidden py-9'>
          <div className='z-20'>
            {/* search bar  big screen */}
            <form
              className='justify-center items-center  w-full '
              onSubmit={formik.handleSubmit}>

              <label htmlFor="search">
                <p className='text-3xl lg:text-5xl  xl:text-6xl'>Happy Shopping with </p>
                <p className='text-4xl bg-white bg-opacity-5 backdrop-blur-sm lg:text-6xl xl:text-8xl font-bold text-color-primary '>OnlineStore</p>

              </label>
              <div className='max-w-lg  xl:w-96 lg:w-80 md:w-72 pt-9 flex'>
                <input
                  type="text"
                  name='search'
                  value={formik.values.search}
                  onChange={formik.handleChange}
                  onFocus={(e) => e.target.placeholder = ""}
                  onBlur={(e) => e.target.placeholder = 'Search products'}
                  placeholder='Search products'
                  className='w-full outline-none border rounded-l-lg text-center py-0 text-custom-black'
                />
                <button
                  type='submit'
                  className='bg-color-primary hover:bg-color-secondary  font-bold py-0 px-4 rounded-r-lg'
                >
                  <HiSearch size={30} className='text-white' />
                </button>

              </div>

            </form>
            <div className='flex  py-5 w-3/3'>
              <div>
                <p className=''>Explore a vast selection of products.
                  <br />
                  Easy Returns.              Buy Now!
                  <br />
                  Top brands for Phones and Electronics.
                  <br />
                  Latest trends in Fashion.
                </p>
                <p className='text-yellow-900 text-sm pt-10 flex'>with Free Shipping available*
                </p>
              </div>
            </div>
          </div>
          <div className='h-auto w-full z-0 lg:block flex items-center'>
            <img
              className='object-cover transform -scale-x-100 hidden xl:-mt-[60px] '
              src={process.env.PUBLIC_URL + '/assets/shopping-bag-stock-photography-woman-shopping-girl-shopping-0de7bc67f751c0173f69ea3d123c0efa.png'} alt="" />
          </div>
        </div>





      </div >

    </div >




  );
};

export default Header;
