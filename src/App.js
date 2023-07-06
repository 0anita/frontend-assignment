import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Detail from './pages/ProductDetails'
import { useGetAllProductsQuery } from './Features/storeApi'
import Cart from './components/Cart'


const App = () => {
  const { isLoading, isError, error, data } = useGetAllProductsQuery()
  console.log(data)
  return (
    <div>
      <Header data={data} />
      <Routes>
        <Route path='/' element={<Home isLoading={isLoading} isError={isError} error={error} data={data} />} />
        <Route path='/products' element={<Home isLoading={isLoading} isError={isError} error={error} data={data} />} />
        <Route path="/cart" element={<Cart />} />

        <Route path='/searchResults/:search' element={<SearchResults data={data} />} />
        <Route path='product/detail/:title' element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
