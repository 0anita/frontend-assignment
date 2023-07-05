import React from 'react'
import { useGetAllProductsQuery } from '../Features/storeApi'
import ViewProducts from '../components/ViewProducts'
import Search from '../components/Search'
import SearchResults from './SearchResults'
import Sidebar from '../components/Sidebar'

const Home = () => {
  const { isLoading, isError, error, data } = useGetAllProductsQuery()
  console.log(data)


  return (
    <div className='md:flex'>

      <Sidebar
        data={data}
      />
      <ViewProducts
        sdata={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  )
}

export default Home